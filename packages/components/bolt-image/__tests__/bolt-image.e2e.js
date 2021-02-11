let currentBrowser;

module.exports = {
  tags: ['component', 'image'],
  'Bolt Image image is showed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-image-showed';
    let bodyWidth = 0;

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/999-tests-image-00-image-no-shadow/999-tests-image-00-image-no-shadow.html`,
      )
      .waitForElementVisible('body', 1000)
      .getElementSize('body', function(result) {
        bodyWidth = result.value.width;
      })
      .getElementSize('bolt-image', function(result) {
        const imageHeight = Math.round(bodyWidth / 1.3333333333);

        this.assert.equal(result.value.width, bodyWidth);
        // this.assert.equal(result.value.height, imageHeight);
      })
      .execute(
        function(data) {
          return document.querySelector('bolt-image')._wasInitiallyRendered;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified the <bolt-image> was rendered via the "_wasInitiallyRendered" property.`,
          );
        },
      )
      .assert.attributeContains(
        '.c-bolt-image__image',
        'src',
        '/images/placeholders/landscape-16x9-mountains.jpg',
      )
      .assert.attributeEquals(
        '.c-bolt-image__image',
        'srcset',
        '/images/placeholders/landscape-16x9-mountains-50.jpg 50w, /images/placeholders/landscape-16x9-mountains-100.jpg 100w, /images/placeholders/landscape-16x9-mountains-200.jpg 200w, /images/placeholders/landscape-16x9-mountains-320.jpg 320w, /images/placeholders/landscape-16x9-mountains-480.jpg 480w, /images/placeholders/landscape-16x9-mountains-640.jpg 640w, /images/placeholders/landscape-16x9-mountains-800.jpg 800w, /images/placeholders/landscape-16x9-mountains-1024.jpg 1024w, /images/placeholders/landscape-16x9-mountains.jpg 1151w',
      )
      .saveScreenshot(
        `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
