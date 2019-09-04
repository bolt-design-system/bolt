import * as grapesjs from 'grapesjs'; // eslint-disable-line no-unused-vars
// @ts-ignore
import buttonSchema from '@bolt/components-button/button.schema.yml';
// @ts-ignore
import textSchema from '@bolt/components-text/text.schema.yml';
import iconSchema from '@bolt/components-icon/icon.schema.json';
import characterSchema from '@bolt/micro-journeys/src/character.schema';
import statusDialogueBarSchema from '@bolt/micro-journeys/src/status-dialogue-bar.schema';
// @ts-ignore
import blockquoteSchema from '@bolt/components-blockquote/blockquote.schema.yml';
// @ts-ignore
import chipSchema from '@bolt/components-chip/chip.schema.yml';
// @ts-ignore
import imageSchema from '@bolt/components-image/image.schema.yml';
import animateSchema from '@bolt/components-animate/animate.schema';
// import { animationNames } from '@bolt/components-animate/animation-meta';
import { isChildOfEl, convertSchemaPropToTrait } from './utils';

class EditorRegisterBoltError extends Error {}

const smallButton = {
  id: 'bolt-button--small',
  title: 'Button',
  data: {
    type: 'bolt-button',
    content: 'Button',
    attributes: {
      size: 'small',
    },
  },
};

const basicText = {
  id: 'bolt-text',
  title: 'Text',
  data: {
    type: 'bolt-text',
    attributes: {
      'font-size': 'xsmall',
    },
    content: `Hello!`,
  },
};

const statusBar = {
  id: 'bolt-status-dialogue-bar',
  title: 'Dialogue Bar',
  data: {
    type: 'bolt-status-dialogue-bar',
    attributes: {
      'icon-name': 'cloud',
    },
    content: `<p slot="text"> I'm a large character </p>`,
  },
};

const statusBarAlert = {
  id: 'bolt-status-dialogue-bar--alert',
  title: 'Dialogue Bar: alert',
  data: {
    type: 'bolt-status-dialogue-bar',
    attributes: {
      'dialogue-arrow-direction': 'none',
      'is-alert-message': true,
      'icon-name': 'exclamation', // @todo change to exclamation mark after icon is added
    },
    content: `<p slot="text"> Uh oh! </p>`,
  },
};

const icon = {
  id: 'bolt-icon',
  title: 'Icon',
  data: {
    type: 'bolt-icon',
    attributes: {
      size: 'xlarge',
      name: 'customer-onboarding',
      background: 'circle',
      color: 'blue',
    },
  },
};

const basicSlottableComponents = [
  statusBar,
  statusBarAlert,
  icon,
  smallButton,
  basicText,
];

/**
 * @param {grapesjs.Editor} editor
 * @returns {void}
 */
export function setupBolt(editor) {
  const {
    /** @type {grapesjs.DomComponents} */
    DomComponents,
    /** @type {grapesjs.BlockManager} */
    BlockManager,
  } = editor;

  DomComponents.addType('div', {
    isComponent: el => el.tagName === 'DIV',
    model: {
      defaults: {
        tagName: 'div',
        type: 'div',
        draggable: false,
        droppable: false,
        traits: [],
      },
    },
  });

  /**
   * @param {Object} opt
   * @param {string} opt.name i.e. `bolt-button`
   * @param {import('./utils').JsonSchema} [opt.schema]
   * @param {string} [opt.initialContent] HTML for when block is added
   * @param {string} [opt.extend] name of GrapesJS Component to extend
   * @param {string} [opt.category='Bolt Components']
   * @param {boolean | string} [opt.draggable=true] Indicates if it's possible to drag the component inside others. Can use CSS selectors
   * @param {boolean} [opt.editable=true] Allow to edit the content of the component (used on Text components).
   * @param {boolean} [opt.highlightable=true]
   * @param {boolean} [opt.badgable=true] Set to false if you don't want to see the badge (with the name) over the component. Default: `true`
   * @param {boolean} [opt.layerable=true] Set to `false` if you need to hide the component inside Layers. Default: `true`
   * @param {boolean} [opt.selectable=true] Allow component to be selected when clicked. Default: `true`
   * @param {boolean} [opt.registerBlock=true] Register as a GrapesJS Block in addition to Component? If so, allows the user to add it from menu.
   * @param {string[]} [opt.propsToTraits=[]] Json Schema properties keys to auto-add to traits via `convertSchemaPropToTrait`
   * @param {grapesjs.GrapeTrait[]} [opt.extraTraits=[]] Full Trait objects that need more custom attention than `propsToTraits`
   * @param {(el: HTMLElement) => boolean} [opt.isComponent] - function to determine if an HTMLElement is this component. Defaults to seeing if tag name is component name
   * @param {Object.<string, boolean|string>} [opt.slots={ default: true }] - Which slots are available and what can go in them. For example `{ default: true, top: 'bolt-text, bolt-button' }` would let any element be placed as a direct child (the `default` slot) and the `top` slot would only accept `<bolt-text>` or `<bolt-button>`. Those values are passed right to Grape JS's `droppable`.
   * @param {grapesjs.SlotControl[]} [opt.slotControls]
   * @returns {{ component: Object, block: Object }} instances from registering @todo fill out types
   * @see {convertSchemaPropToTrait}
   */
  function registerBoltComponent({
    name,
    extend,
    schema = { properties: {} },
    initialContent = 'Hello World',
    category = 'Bolt Components',
    draggable = true,
    editable = false,
    highlightable = false,
    registerBlock = true,
    badgable = true,
    layerable = true,
    selectable = true,
    propsToTraits = [],
    extraTraits = [],
    isComponent,
    slots = { default: false },
    slotControls,
  }) {
    const { title, description, properties } = schema;

    const traitsFromProps = propsToTraits.map(propName => {
      const prop = properties[propName];

      if (!prop) {
        console.log({ schema });
        throw new EditorRegisterBoltError(
          `Prop "${propName} does not exist on schema for "${name}"`,
        );
      }

      return convertSchemaPropToTrait({ prop, name: propName });
    });

    // Registering slots as Components so we can declare them as dropzones
    Object.keys(slots).forEach(slotName => {
      if (slotName === 'default') return;
      const droppable = slots[slotName];
      const slotComponentName = `${name}__slot--${slotName}`;
      // These are the components that can be slots, we use `null` to indicate that any HTML element with a `slot` attribute
      const extendableComponents = [null, 'bolt-animate'];

      extendableComponents.forEach(extendableComponent => {
        const slotId = extendableComponent
          ? `${slotComponentName}--${extendableComponent}`
          : slotComponentName;

        DomComponents.addType(slotId, {
          extend: extendableComponent,
          isComponent: el => {
            if (!el.getAttribute) return false;
            const assignedSlot = el.getAttribute('slot');
            if (!isChildOfEl(el, name)) return false;
            if (assignedSlot === slotName) {
              if (extendableComponent) {
                return el.tagName === extendableComponent.toUpperCase();
              }
              return true;
            }
          },
          model: {
            defaults: {
              draggable: false,
              droppable,
              removable: false,
              copyable: false,
              selectable: true,
              editable: true,
              layerable: true,
              hoverable: true,
              badgable: true,
              //traits: [],
              icon: `<bolt-icon name="download" title="Slot Dropzone"></bolt-icon>`,
            },
          },
        });
      });
    });

    const component = DomComponents.addType(name, {
      isComponent: isComponent
        ? isComponent
        : el => el.tagName === name.toUpperCase(),
      extend,
      model: {
        defaults: {
          type: name,
          tagName: name,
          draggable,
          droppable: slots.default,
          editable,
          highlightable,
          badgable,
          selectable,
          layerable,
          traits: [...traitsFromProps, ...extraTraits],
        },
        getSlotControls() {
          return slotControls;
        },
      },
    });

    if (registerBlock) {
      const block = BlockManager.add(name, {
        label: `<span title="${description}">${title || name}</span>`,
        category,
        select: true,
        content: {
          type: name,
          components: [initialContent],
        },
      });

      return {
        component,
        block,
      };
    }

    return {
      component,
      block: null,
    };
  }

  // schema has it as `style` but web component uses it as `color` since `style` is a reserved HTML attribute; see http://vjira2:8080/browse/BDS-721 & http://vjira2:8080/browse/BDS-1104
  const colorTrait = convertSchemaPropToTrait({
    prop: buttonSchema.properties.style,
    name: 'color',
  });
  colorTrait.label = 'Color';

  registerBoltComponent({
    name: 'bolt-button',
    schema: buttonSchema,
    extend: 'text',
    initialContent: 'Button',
    propsToTraits: ['size', 'width', 'border_radius'],
    extraTraits: [colorTrait],
  });

  registerBoltComponent({
    name: 'bolt-text',
    schema: textSchema,
    extend: 'text',
    editable: true,
    highlightable: true,
    initialContent: 'Some Text',
    propsToTraits: [
      'align',
      'color',
      'display',
      'eyebrow',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'headline',
      'letter-spacing',
      'line-height',
      'quoted',
      'subheadline',
      'tag',
      'text-transform',
      'text',
      'url',
    ],
  });

  registerBoltComponent({
    name: 'bolt-icon',
    schema: iconSchema,
    // draggable: '[slot]',
    initialContent: `<span></span>`,
    propsToTraits: ['size', 'name', 'background', 'color'],
  });

  registerBoltComponent({
    name: 'bolt-blockquote',
    schema: blockquoteSchema,
    initialContent: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
    slots: {
      default: true,
      logo: true,
    },
    propsToTraits: ['size', 'alignItems', 'border', 'indent', 'fullBleed'],
    extraTraits: [
      convertSchemaPropToTrait({
        name: 'author-name',
        prop: blockquoteSchema.properties.author.properties.name,
      }),
      convertSchemaPropToTrait({
        name: 'author-title',
        prop: blockquoteSchema.properties.author.properties.title,
      }),
    ],
  });

  registerBoltComponent({
    name: 'bolt-chip',
    schema: chipSchema,
    initialContent: `<span>Placeholder</span>`,
    propsToTraits: ['url'],
  });

  registerBoltComponent({
    name: 'bolt-image',
    schema: imageSchema,
    initialContent: `<span>Placeholder</span>`, // @todo set
    propsToTraits: ['src', 'alt', 'no_lazy', 'cover'],
    extraTraits: [
      {
        name: 'ratio',
        label: 'Ratio',
        type: 'text',
        default: '4/3',
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-interactive-step',
    draggable: false,
    editable: false,
    highlightable: false,
    registerBlock: false,
    extraTraits: ['tab-title'],
    slots: {
      // title: true,
      top: true,
      bottom: true,
    },
  });

  registerBoltComponent({
    name: 'bolt-interactive-pathways',
    draggable: false,
    editable: false,
    highlightable: true,
    registerBlock: false,
    slots: {
      default: true,
    },
  });

  registerBoltComponent({
    name: 'bolt-interactive-pathway',
    draggable: false,
    editable: false,
    highlightable: false,
    registerBlock: false,
    slots: {
      steps: true,
    },
  });

  registerBoltComponent({
    name: 'bolt-animate',
    schema: animateSchema,
    propsToTraits: Object.keys(animateSchema.properties),
    draggable: false,
    editable: true,
    highlightable: true,
    registerBlock: false,
    slots: {
      default: true,
    },
  });

  registerBoltComponent({
    name: 'bolt-connection',
    draggable: false,
    editable: false,
    highlightable: true,
    registerBlock: false,
    slots: {
      top: true,
      bottom: true,
    },
    slotControls: ['top', 'bottom'].map(slotName => ({
      slotName,
      components: basicSlottableComponents,
    })),
  });

  registerBoltComponent({
    name: 'bolt-character',
    schema: characterSchema,
    draggable: false,
    editable: true,
    highlightable: true,
    registerBlock: false,
    propsToTraits: ['size', 'characterImage', 'characterCustomUrl', 'useIcon'],
    slots: {
      default: false,
      top: true,
      left: true,
      right: true,
      bottom: true,
    },
    slotControls: ['top', 'right', 'bottom', 'left'].map(slotName => ({
      slotName,
      components: basicSlottableComponents,
    })),
  });

  registerBoltComponent({
    name: 'bolt-status-dialogue-bar',
    schema: statusDialogueBarSchema,
    initialContent: `<bolt-text size="xsmall" slot="text">Insert Text Here</bolt-text>`,
    draggable: true,
    editable: true,
    highlightable: true,
    propsToTraits: ['iconName', 'isAlertMessage', 'dialogueArrowDirection'],
    slots: {
      default: false,
      // @todo consider changing `text` to `default`
      text: true,
    },
  });
}
