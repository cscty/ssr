import express from "express";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "../router";
import { renderToString } from "react-dom/server";
import { matchRoutes } from "react-router-dom";
import { getServerStore } from "../store";
import { Provider } from "react-redux";
const app = express();
app.use(express.static("public"));

app.get("*", async function (req, res) {
  let handler = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req, res);
  let context = await handler.query(fetchRequest);
  let router = createStaticRouter(routes, context);
  const store = getServerStore();
  matchRoutes(routes, req.path).map(({ route }) => {
    const component = route.Component;
    component.getInitData?.(store);
  });
  try {
    let html = renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    );

    res.send(`
    <!doctype html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>同构渲染</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
        window.INITIAL_STATE=${JSON.stringify(store.getState())}</script>
        <script src="/index.js"></script>  
      </body>
    </html>
  `);
  } catch (error) {
    res.send(`
    <!doctype html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>降级客户端渲染</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="/index.js"></script>  
      </body>
    </html>
  `);
  }
});

app.listen(3000);

function createFetchRequest(req, res) {
  let origin = `${req.protocol}://${req.get("host")}`;
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  res.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
