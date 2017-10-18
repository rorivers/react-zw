import webpack from 'webpack';
import webpackConfig from '../config/webpack.config';

function build() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.info(stats,toString(webpackConfig.stats));
      return resolve;
    });
  });
}

export default build;
