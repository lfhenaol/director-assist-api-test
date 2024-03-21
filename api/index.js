import Fastify from 'fastify'
import { LOGIN_RESPONSE } from './login_response'

const app = Fastify({
  logger: true,
})

app.post("/login", async (request, reply) => {
  reply.type("application/json").code(200);
  console.log(request.body);

  await sleep(Math.random() * 4000);

  return LOGIN_RESPONSE;
});

app.get("/info", async (request, reply) => {
  reply.type("application/json").code(200);

  await sleep(Math.random() * 4000);

  return {
    data: {
      key: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg/qO0L4MGEwug096GZ1z\nsC8ms8gREMhZcLP7vlVOps8j8XB2FzgR7OAMhTQfoWq5XQufFjsMUNnPmfbZmUsj\n4cG+djrZT0uTn10yBNd2R0v3wgNGrCUgmW6tVQ6+4s4xK3i/jtRAIhumILBpNClf\nAbmC9SgZJzcWIg5J6e74g/XgTjOAs93hCtHD2tXtRev0pr9zckB1H+fPWRq0GVco\nzxHRNyntFJgoCUURObmN3AYI4kO0riBbsR0G+VeYrMPofvNTdmsa1EDWi4dPWfSe\n7NADb6F+Vl3n7tIxfPJUWxdOrYDQjFJUSYsEVWA4sejC6L8V87cEajlagYlbrJQm\n4QIDAQAB\n-----END PUBLIC KEY-----\n",
      nombre_director: "Director Assist",
      nombre_operacion: "MINAS GERAIS",
      version_api: "v2.6.1 2024-03-14",
      version_core: "v2.6.1 2024-03-14",
    },
    message: "Bad request get info",
    success: true,
  };
});


// fastify.get("/info", async (request, reply) => {
//   reply.type("text/html").code(401);

//   await sleep(Math.random() * 4000);

//   return `
//     <html>
//       <head>
//         <title> Error 500 </title>
//       </head>
//       <body>
//         <h1> Error 500! </h1>
//       </body>
//     </html>
//   `;
// });

app.get("/api", async (request, reply) => {
  reply.type("application/json").code(200);

  await sleep(Math.random() * 4000);

  return {
    data: {
      dato_ppal: (Math.random() * 10000).toFixed(0),
      dato_secundario: Math.random() > 0.5 ? null : makeid(3),
    },
    message:
      "Success get Cantidad citas agendadas dia - Panorama de la operaci\u00f3n",
    success: true,
  };
});

app.get("/lista-turnos-citas", async (request, reply) => {
  reply.type("application/json").code(200);

  await sleep(Math.random() * 4000);

  return {
    data: {
      lista_turnos_citas: [
        "AGD5",
        "AGD2",
        "AGD632",
        "DES54",
        "DES18",
        "DES11",
        "AGD3",
        "AGD1",
        "AGD4",
        "AGD80",
      ],
    },
    message: "Success get Lista turnos citas - Panorama de la operaci\u00f3n",
    success: true,
  };
});

app.listen({ port: 4321, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Vercel + Fastify Hello World</title>
    <meta
      name="description"
      content="This is a starter template for Vercel + Fastify."
    />
  </head>
  <body>
    <h1>Vercel + Fastify Hello World</h1>
    <p>
      This is a starter template for Vercel + Fastify. Requests are
      rewritten from <code>/*</code> to <code>/api/*</code>, which runs
      as a Vercel Function.
    </p>
    <p>
        For example, here is the boilerplate code for this route:
    </p>
    <pre>
<code>import Fastify from 'fastify'

const app = Fastify({
  logger: true,
})

app.get('/', async (req, res) => {
  return res.status(200).type('text/html').send(html)
})

export default async function handler(req: any, res: any) {
  await app.ready()
  app.server.emit('request', req, res)
}</code>
    </pre>
    <p>
    <p>
      <a href="https://vercel.com/templates/other/fastify-serverless-function">
      Deploy your own
      </a>
      to get started.
  </body>
</html>
`
