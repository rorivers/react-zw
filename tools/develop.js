import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import Webpack from 'webpack';
import config from '../config/webpack.config';

const compiler = Webpack(config);

const app = new Koa();

app.use(koaWebpack({ compiler }));

app.listen(3030);
