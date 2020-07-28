import { html, customElement } from '@bolt/element';
import {
  props,
  hasNativeShadowDomSupport,
  query,
  convertSchemaToProps,
} from '@bolt/core-v3.x/utils';
import { withLitContext } from '@bolt/core-v3.x/renderers';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import styles from './interactive-pathway.scss';
import schema from './interactive-pathway.schema';

let cx = classNames.bind(styles);

@customElement('bolt-interactive-pathway')
class BoltInteractivePathway extends withLitContext {
  static is = 'bolt-interactive-pathway';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    theme: props.string,
    ...convertSchemaToProps(schema),
  };

  static get observedContexts() {
    return ['theme'];
  }

  contextChangedCallback(name, oldValue, value) {
    this.triggerUpdate();
  }

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    self.isActivePathway = false;
    self.activeStep = -1;
    self.steps = [];
    self.checkChildrenAndRender = debounce(done => {
      self.steps = self.getSteps();
      self.triggerUpdate();
      // using callback since debounced promises require a different library that's not already in Bolt
      if (done) setTimeout(done, 0);
    }, 150);
    self.addEventListener(
      'bolt-interactive-step:connected',
      self.handleStepConnect,
    );
    self.addEventListener(
      'bolt-interactive-step:disconnected',
      self.handleStepDisconnect,
    );

    self.addEventListener('bolt-interactive-step:change-active-step', event => {
      const steps = self.getSteps();
      const stepId = steps.findIndex(step => step.el === event.target);
      if (stepId > 0) {
        self.setActiveStep(stepId);
      } else {
        console.warn('uh oh! could not find active step', { event, steps });
      }
    });

    self.addEventListener(
      'bolt-interactive-step:change-active-step-to-index',
      event => {
        const { index } = event.detail || {};
        if (typeof index !== 'number') {
          console.warn(
            `Uh oh! "bolt-interactive-step:change-active-step-to-index" event was fired without an "index" in "event.detail"`,
            event,
          );
          return;
        }

        const steps = self.getSteps();
        const totalSteps = steps.length;
        if (totalSteps < index) {
          console.warn(
            `Uh oh! "bolt-interactive-step:change-active-step-to-index" event was fired with an "index" that is bigger than our list of steps total items`,
            {
              event,
              totalSteps,
              index,
            },
          );
          return;
        }

        self.setActiveStep(index);
      },
    );

    self.addEventListener('bolt-interactive-step:title-updated', () => {
      self.checkChildrenAndRender();
    });
    return self;
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent(`${BoltInteractivePathway.is}:connected`, {
          bubbles: true,
          detail: {
            title: this.getTitle(),
          },
        }),
      );
    }, 0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent(`${BoltInteractivePathway.is}:disconnected`, {
          bubbles: true,
          detail: {
            title: this.getTitle(),
          },
        }),
      );
    }, 0);
  }

  /**
   * @return {{ el: BoltInteractiveStep, title: string }[]}
   */
  getSteps() {
    const els = /** @type {BoltInteractiveStep[]} */ (query(
      'bolt-interactive-step',
      this,
    ));

    return els.map(el => ({
      el,
      title: el.getTitle(),
    }));
  }

  /**
   * @param {Event} event
   */
  handleStepConnect(event) {
    this.checkChildrenAndRender();
  }

  /**
   * @param {Event} event
   */
  handleStepDisconnect(event) {
    this.checkChildrenAndRender();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'pathway-title':
        if (oldValue !== newValue) {
          // this.triggerUpdate();
          this.dispatchEvent(
            new CustomEvent(`${BoltInteractivePathway.is}:title-updated`, {
              bubbles: true,
            }),
          );
        }
        break;
    }
  }

  setActive(isActive = true) {
    this.isActivePathway = isActive;
    this.triggerUpdate();
    setTimeout(() => {
      this.setActiveStep(0);
      this.triggerUpdate();
      this.isBecomingActive = false;
    }, 0);
  }

  /**
   * @return {string}
   */
  getTitle() {
    return this.props.pathwayTitle;
  }

  /**
   * Set the active tab panel step
   * @param {number} stepIndex
   * @return {Promise<void>}
   */
  setActiveStep = async stepIndex => {
    if (stepIndex === this.activeStep) {
      // @todo first one initially set twice, causes double animation in
      console.warn('current step already active');
      return;
    }
    const steps = this.getSteps();
    if (!steps) {
      console.error('No steps inside, so cannot setActiveStep', this);
      return;
    }
    const newActiveStep = steps[stepIndex];
    const currentActiveStep = steps[this.activeStep];
    if (!newActiveStep) {
      console.error(
        `uh oh setActiveStep fired with stepIndex "${stepIndex}" but could not find one`,
      );
      return;
    }
    await newActiveStep.el.setIsBecomingActive();
    if (currentActiveStep) {
      await currentActiveStep.el.triggerAnimOuts();
      steps.forEach(step => step.el.setActive(false));
    }
    this.activeStep = stepIndex;
    newActiveStep.el.setActive(true);
    this.triggerUpdate();
    setTimeout(async () => {
      await newActiveStep.el.triggerAnimIns();
      this.dispatchEvent(
        new CustomEvent('bolt:layout-size-changed', {
          bubbles: true,
        }),
      );
    });
  };

  rendered() {
    // The rendered content will be empty until the following condition is met.
    // Therefore, hold off on calling super.rendered() (which in turn emits the
    // "ready" event) until the condition is true.
    if (this.isActivePathway || this.isBecomingActive) {
      super.rendered && super.rendered();
    }
  }

  render() {
    if (!this.isActivePathway && !this.isBecomingActive) {
      return '';
    }
    // Inherit theme from `interactive-pathways`
    const theme = this.context.theme || this.theme || '';
    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: !this.isActivePathway,
      [`c-bolt-interactive-pathway--active`]: this.isActivePathway,
      [`t-bolt-${theme}`]: theme,
    });

    const navClasses = cx('c-bolt-interactive-pathway__nav');
    const itemClasses = cx('c-bolt-interactive-pathway__items');
    const activeStep = this.activeStep < 0 ? 0 : this.activeStep;
    return html`
      ${this.addStyles([styles])}
      <section class="${classes}">
        <nav class="${navClasses}">
          ${this.steps.map((step, stepIndex) => {
            const isActiveItem = activeStep === stepIndex;
            const navItemClasses = cx('c-bolt-interactive-pathway__nav-item', {
              'c-bolt-interactive-pathway__nav-item--active': isActiveItem,
            });
            return html`
              <div
                class="${navItemClasses}"
                @click=${() => this.setActiveStep(stepIndex)}
              >
                ${step.title}
              </div>
            `;
          })}
        </nav>
        <div class="${itemClasses}">
          ${this.slot('default')}
        </div>
      </section>
    `;
  }
}

export { BoltInteractivePathway };
