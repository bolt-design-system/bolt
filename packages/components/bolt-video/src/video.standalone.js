import { define, props, css } from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';
import dasherize from 'dasherize';
import Mousetrap from 'mousetrap';

// Bolt v2.0 will be shipping with this in Bolt core -- manually adding this in to the Bolt video player as a temp workaround till then.
import { beforeNextRender } from '@polymer/polymer/lib/utils/render-status.js';

let index = 0;

@define
class BoltVideoMeta extends withPreact() {
  static is = `${bolt.namespace}-video-meta`;

  constructor(self) {
    self = super(self);
    return self;
  }

  static props = {
    duration: props.string,
    title: props.string,
  };

  get renderRoot() {
    return this;
  }

  render() {
    // All of its logic is contained here in render(), but it could be updated to be a property that is set
    // externally (such as when the video has finished fully loading).

    // [Mai] 'reveal' allows the meta data (title and duration) to be hidden.
    const reveal = Boolean(this.title || this.duration);
    return (
      <div className={`c-${bolt.namespace}-video-meta`}>
        {reveal ? (
          <div className={`c-${bolt.namespace}-video-meta__wrapper`}>
            {this.title ? (
              <div
                className={`c-${bolt.namespace}-video-meta__item c-${
                  bolt.namespace
                }-video-meta__item--title`}>
                {this.title}
              </div>
            ) : null}
            <div
              className={`c-${bolt.namespace}-video-meta__item c-${
                bolt.namespace
              }-video-meta__item--duration`}>
              {this.duration}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

@define
class BoltVideo extends withPreact() {
  static is = `${bolt.namespace}-video`;

  static props = {
    videoId: props.string,
    accountId: props.string,
    playerId: props.string,
    poster: props.object,
    isBackgroundVideo: props.boolean,
    onInit: props.string,
    showMeta: props.boolean,
    showMetaTitle: props.boolean,
    closeButtonText: props.string,
    loop: props.boolean,
    // onError: null,
    // onPlay: null,
    // onPause: null,
    // onFinish: null,
    // onProgress: null,
    // onDuration: null,
    controls: props.boolean,
    autoplay: props.boolean,
    resetOnFinish: props.boolean,
    directToFullscreen: props.boolean,
    hideFullScreenButton: props.boolean,
  };

  constructor(self) {
    self = super(self);

    index += 1;

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
    // this.onProgress = this.onProgress.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onSeeked = this.onSeeked.bind(this);

    // This binding is necessary to make `this` work in the callback
    this.handleClose = this.handleClose.bind(this);

    this.collapseOnClickAway = this.collapseOnClickAway.bind(this);

    // BoltVideo.globalErrors.forEach(this.props.onError);

    this.defaultProps = {
      // width: 320,
      // height: 180,
      // playerId: "default",
      // onError: () => { },
      // onPlay: () => { },
      // onPause: () => { },
      // onFinish: () => { },
      // onProgress: () => { },
      // onDuration: () => { },
      loop: false,
      autoplay: false,
      hideFullScreenButton: false,
      directToFullscreen: false,
      resetOnFinish: false,
    };

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);

    return self;
  }

  get renderRoot() {
    return this;
  }

  get expandedHeight() {
    return this.getAttribute('expandedHeight');
  }

  /**
   * Properties and their corresponding attributes should mirror one another.
   * To this effect, the property setter for `expanded` handles truthy/falsy
   * values and reflects those to the state of the attribute. It’s important
   * to note that there are no side effects taking place in the property
   * setter. For example, the setter does not set `aria-expanded`. Instead,
   * that work happens in the `attributeChangedCallback`. As a general rule,
   * make property setters very dumb, and if setting a property or attribute
   * should cause a side effect (like setting a corresponding ARIA attribute)
   * do that work in the `attributeChangedCallback`. This will avoid having to
   * manage complex attribute/property reentrancy scenarios.
   */
  set expandedHeight(value) {
    // Properties can be set to all kinds of string values. This makes sure
    // it’s converted to a proper boolean value using JavaScript’s truthiness
    // & falsiness principles.
    // value = Boolean(value);
    if (value) {
      this.setAttribute('expandedHeight', value);
    } else {
      this.removeAttribute('expandedHeight');
    }

    this.dispatchEvent(
      new CustomEvent('videoExpandedHeightSet', {
        detail: { expandedHeight: this.expandedHeight },
        bubbles: true,
      }),
    );
  }

  // Called to check whether or not the component should call
  // updated(), much like React's shouldComponentUpdate().
  // updating(props, state) {
  //   console.log(props);
  //   console.log(state);
  // }

  _setMetaTitle(title) {
    if (this.props.showMeta && this.props.showMetaTitle) {
      this.querySelector(`${bolt.namespace}-video-meta`).setAttribute(
        'title',
        title,
      );
    }
  }

  _setMetaDuration(seconds) {
    if (this.props.showMeta) {
      const durationFormatted = BoltVideo._formatDuration(seconds);
      this.querySelector(`${bolt.namespace}-video-meta`).setAttribute(
        'duration',
        durationFormatted,
      );
    }
  }

  static _formatDuration(seconds) {
    const mm = Math.floor(seconds / 60) || 0;
    const ss = ('0' + Math.floor(seconds % 60)).slice(-2);

    return mm + ':' + ss;
  }

  _setVideoDimensions(width, height) {
    this.srcWidth = width;
    this.srcHeight = height;
  }

  static handlePlayerReady(context) {
    const player = this;
    const elem = context;

    elem.setPlayer(player);

    // If the option to show controls is set to false (meaning, no controls will be shown), make sure the video is also muted.
    if (elem.controls === false) {
      elem.player.muted(true);
    }

    player.on('loadedmetadata', function() {
      const duration = player.mediainfo.duration;
      const title = player.mediainfo.name;
      const width = player.mediainfo.sources[1].width;
      const height = player.mediainfo.sources[1].height;

      elem._setMetaTitle(title);
      elem._setMetaDuration(duration);
      elem._setVideoDimensions(width, height);

      if (this.earlyToggle) {
        this.earlyToggle = false;
        this.toggle();
      } else if (this.earlyPlay) {
        this.earlyPlay = false;
        this.play();
      } else if (this.earlyPause) {
        this.earlyPause = false;
        this.pause();
      }
    });

    player.on('play', function() {
      elem.onPlay(player);
    });

    player.on('pause', function() {
      elem.onPause(player);
    });

    player.on('seeked', function() {
      elem.onSeeked(player);
    });

    player.on('timeupdate', function() {
      // elem.onPlay(player);
    });

    player.on('durationchange', function() {
      elem.onDurationChange(player);
    });

    player.on('ended', function() {
      elem.onEnded(player);
    });

    // this.contextmenu({ disabled: true });
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static getScriptUrl(accountId, playerId) {
    return `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
  }

  static getCurrentTimeMs(player) {
    return Math.round(player.currentTime() * 1000);
  }

  static getDurationMs(player) {
    return Math.round(player.duration() * 1000);
  }

  // static isBackgroundVideo() {
  //   return this.props.isBackgroundVideo;
  // }

  handleClose() {
    this.close();
  }

  connecting() {
    this.state = {
      // IDs can't start with numbers so adding the "v" prefix to prevent JS errors
      id: `v${this.props.videoId}-${this.props.accountId}-${index}`,
      // errors: BoltVideo.globalErrors !== undefined  ? [].concat(BoltVideo.globalErrors) : [],
      isPlaying: 'paused',
      isFinished: false,
      progress: 0,
    };

    if (this.props.isBackgroundVideo) {
      this._calculateIdealVideoSize();
    }

    if (this.defaultProps) {
      const defaultProps = this.defaultProps;
      for (const propName in defaultProps) {
        if (this.props[propName] === undefined) {
          this.props[propName] = defaultProps[propName];
        }
      }
    }

    if (BoltVideo.globalErrors !== undefined && BoltVideo.globalErrors.length) {
      // console.log('adding default errors');
      // console.log(this.state.errors);
      this.state.errors = [].concat(BoltVideo.globalErrors);
    } else {
      this.state.errors = [];
    }

    if (this.state.errors.length) {
      // console.log(this.state.errors);
      // console.log('error length');
      return;
    }

    // only ever append script once
    if (!BoltVideo.players) {
      BoltVideo.players = [];

      const s = this.createScript();

      s.onload = () => {
        BoltVideo.players.forEach(function(player) {
          player.initVideoJS(player.state.id);
        });
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: '',
          message: `The script ${err.target.src} is not accessible.`,
        };

        BoltVideo.globalErrors.push(uriErr);

        this.props.onError(uriErr);
      };

      BoltVideo.appendScript(s);
    }

    this.init();

    // If onInit event exists on element, run that instead of auto initializing
    if (this.props.onInit) {
      if (window[this.props.onInit]) {
        window[this.props.onInit](this);
      }
    }

    // If our video can expand/collapse we add the collapse listener and "close on escape" behavior
    if (this.props.isBackgroundVideo) {
      window.addEventListener('resize', this._onWindowResize);
      Mousetrap.bind('esc', this.handleClose, 'keyup');
      document.addEventListener('click', this.collapseOnClickAway);
    }
  }

  _onWindowResize(event) {
    this._calculateIdealVideoSize();
  }

  // If we click outside the video wrapper div collapse the video
  collapseOnClickAway(event) {
    const videoWrapper = this.querySelector('.c-bolt-video--background');
    if (!videoWrapper.contains(event.target)) {
      // @todo: debug why videos don't autoplay when this is enabled
      // this.close();
    }
  }

  // shouldUpdate(props, state) {
  //   return true;
  // }

  // Called when props have been set regardless of if they've changed.
  // updating(props) { }

  /**
   * `attributeChangedCallback` processes changes to the `expanded` attribute.
   */
  // attributeChangedCallback(attributeName, oldValue, newValue) {
  //   console.log(attributeName);
  //   // `expanded` is a boolean attribute it is either set or not set. The
  //   // actual value is irrelevant.
  //   // const value = this.hasAttribute('expanded');
  //   // this._shadowButton.setAttribute('aria-expanded', value);
  // }

  disconnecting() {
    if (this.props.isBackgroundVideo) {
      window.removeEventListener('optimizedResize', this._onWindowResize);
    }

    if (this.player) {
      this.player.dispose();
    }
  }

  onError(player) {
    this.props.onError(player.error());
  }

  onPlay(player) {
    this.classList.add('is-playing');
    this.classList.remove('is-finished');
    this.classList.remove('is-paused');

    // @TODO: implement internal setState method
    // elem.setState({
    //   isPlaying: true,
    //   progress: BoltVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });

    // Dispatch an event that signals a request to expand to the
    // `<howto-accordion>` element.
    this.state.isPlaying = true;
    this.state.progress = BoltVideo.getCurrentTimeMs(player);
    this.state.isFinished = false;

    this.dispatchEvent(
      new CustomEvent('playing', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo,
        },
        bubbles: true,
      }),
    );
  }

  onPause(player) {
    const progress = BoltVideo.getCurrentTimeMs(player);

    this.classList.add('is-paused');
    this.classList.remove('is-playing');

    // @TODO: implement internal setState method
    // this.setState({
    //   isPlaying: false,
    //   progress
    // });

    this.state.isPlaying = false;
    this.state.progress = progress;

    this.dispatchEvent(
      new CustomEvent('pause', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo,
        },
        bubbles: true,
      }),
    );
  }

  onSeeked(player) {
    const progress = BoltVideo.getCurrentTimeMs(player);

    // @TODO: implement internal setState method
    // this.setState({
    //   progress: BoltVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });
    this.state.isFinished = false;
    this.state.progress = progress;
  }

  onDurationChange(player) {
    const duration = BoltVideo.getDurationMs(player);

    // @TODO: implement internal setState method
    // this.setState({ duration: BoltVideo.getDurationMs(player) });

    this.state.duration = duration;
  }

  onEnded() {
    // calling syncronously here inteferes with player and causes errors to be thrown

    setTimeout(() => {
      this.state.isFinished = true;

      this.classList.add('is-finished');
      this.classList.remove('is-paused');

      this.dispatchEvent(
        new CustomEvent('ended', {
          detail: {
            isBackgroundVideo: this.props.isBackgroundVideo,
          },
          bubbles: true,
        }),
      );
      // this.setState({ isFinished: true });
    }, 0);
  }

  _calculateIdealVideoSize() {
    this.expandedHeight = this.getBoundingClientRect().height;
  }

  setPlayer(player) {
    this.player = player;
  }

  createScript() {
    const s = document.createElement('script');

    s.src = BoltVideo.getScriptUrl(this.props.accountId, this.props.playerId);
    s.async = true;

    return s;
  }

  initVideoJS(id) {
    const self = this;

    beforeNextRender(this, function() {
      const player = videojs(id);
      const handler = BoltVideo.handlePlayerReady.bind(player, self);
      player.ready(handler);
    });
  }

  initVideo(id) {
    const self = this;

    beforeNextRender(this, function() {
      bc(self.querySelector(`#${id}`), {
        controlBar: {
          fullscreenToggle: !self.props.hideFullScreenButton,
        },
      });
      self.initVideoJS(id);
    });
  }

  init() {
    const self = this;

    beforeNextRender(this, function() {
      if (window.bc && window.videojs) {
        self.initVideo(self.state.id);
      } else {
        BoltVideo.players.push(self);
      }
    });
  }

  play() {
    if (this.player) {
      this.player.play();
    } else {
      this.earlyPlay = true;

      this.dispatchEvent(
        new CustomEvent('playing', {
          detail: {
            isBackgroundVideo: this.props.isBackgroundVideo,
          },
          bubbles: true,
        }),
      );
    }
  }

  close() {
    this.pause();

    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo,
        },
        bubbles: true,
      }),
    );
  }

  toggle() {
    if (this.player) {
      if (this.state.isPlaying === false || this.state.isPlaying === 'paused') {
        this.play();
      } else {
        this.pause();
      }
    } else {
      this.earlyToggle = true;

      this.dispatchEvent(
        new CustomEvent('playing', {
          detail: {
            isBackgroundVideo: this.props.isBackgroundVideo,
          },
          bubbles: true,
        }),
      );
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    } else {
      this.earlyPause = true;
    }
  }

  render({ state, props }) {
    // console.log('render callback');
    // data-email-subject="Pega - Intelligent Virtual Assistant for Email"
    // data-email-body="Check out this video from Pega"
    // data-email-videourl="https://local.d8.pega.com/insights/resources/intelligent-virtual-assistant-email"

    // const playIconEmoji = () => (
    //   <span role="img" aria-label="play-video">
    //     ▶️
    //   </span>
    // );
    /* eslint jsx-a11y/media-has-caption: "off" */
    // Added a wrapping div as brightcove adds siblings to the video tag

    // Loop through any extra (unknown) data attributes on the main element; copy over to the <video> tag being rendered
    function datasetToObject(elem) {
      var data = {};
      [].forEach.call(elem.attributes, function(attr) {
        if (/^data-/.test(attr.name)) {
          data[dasherize(attr.name)] = attr.value;
        }
      });
      return data;
    }

    const dataAttributes = datasetToObject(this);

    let closeButtonText = null;
    if (this.props.closeButtonText) {
      closeButtonText = this.props.closeButtonText;
    } else {
      closeButtonText = 'Close';
    }

    const classes = css(
      `c-${bolt.namespace}-video`,
      this.props.controls === false
        ? `c-${bolt.namespace}-video--hide-controls`
        : '',
      this.props.isBackgroundVideo
        ? `c-${bolt.namespace}-video--background`
        : '',
    );

    const videoMetaTag = `${bolt.namespace}-video-meta`;

    return (
      <span className={classes}>
        <video
          {...dataAttributes}
          id={this.state.id}
          {...(this.props.poster ? { poster: this.props.poster.uri } : {})}
          data-embed="default"
          data-video-id={this.props.videoId}
          preload="none"
          data-account={this.props.accountId}
          data-player={this.props.playerId}
          // playIcon={playIconEmoji()}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={this.props.autoplay}
          data-application-id
          loop={this.props.loop}
          className="video-js"
          controls={this.props.controls === false ? false : true}
        />
        {this.props.showMeta && h(videoMetaTag)}
        {this.props.isBackgroundVideo && (
          <a
            className={css(
              `c-${bolt.namespace}-video__close-button`,
              `c-${bolt.namespace}-video__close-button--icon-to-text`,
            )}
            href="javascript:"
            onClick={this.handleClose}>
            <span className={`c-${bolt.namespace}-video__close-button-icon`}>
              <div class="c-bolt-button c-bolt-button--xsmall c-bolt-button--secondary c-bolt-button--rounded c-bolt-button--icon-only">
                <span class="c-bolt-button__icon">
                  <bolt-icon name="close" size="small" />
                </span>
              </div>
            </span>
            <span className={`c-${bolt.namespace}-video__close-button-text`}>
              {closeButtonText}
            </span>
          </a>
        )}
      </span>
    );
  }
}

// BoltVideo.globalErrors = [];
//BoltVideo.props = defaults;

export default BoltVideo;
