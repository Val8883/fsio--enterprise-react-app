const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#e3502f',
              '@link-color': '#02aeb4',
              '@heading-color': '#012025',
              '@text-color': '#012025',
              '@success-color': '#1cce2b',
              '@error-color': '#e3502f',
              '@font-size-base': '16px',
              '@line-height-base': 1.15,
              '@body-background': '#fce4a1',
              '@card-background': '#c9b16e',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
