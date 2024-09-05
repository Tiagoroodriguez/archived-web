import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { getSuscriptoresRequest } from '../../api/subscriber';
import { sendMailRequest } from '../../api/pedidos';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';

export default function AdminNewsletter() {
  const modules = {
    toolbar: [
      // Quita las opciones de header
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // Formatos permitidos
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  const [descripcion, setDescripcion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [suscriptores, setSuscriptores] = useState([]);
  const [suscriptores10, setSuscriptores10] = useState([]);

  const handleDescripcionChange = (content) => {
    setDescripcion(content);
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    try {
      const html = `
    <!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Call To Action</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class='body'] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class='body'] p,
table[class='body'] ul,
table[class='body'] ol,
table[class='body'] td,
table[class='body'] span,
table[class='body'] a {
    font-size: 16px !important;
  }

  table[class='body'] .wrapper,
table[class='body'] .article {
    padding: 10px !important;
  }

  table[class='body'] .content {
    padding: 0 !important;
  }

  table[class='body'] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class='body'] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class='body'] .btn table {
    width: 100% !important;
  }

  table[class='body'] .btn a {
    width: 100% !important;
  }

  table[class='body'] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #d5075d !important;
  }

  .btn-primary a:hover {
    background-color: #d5075d !important;
    border-color: #d5075d !important;
  }
}
</style></head>
  <body class style="background-color: #1A1F25; font-family: Helvetica; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #1A1F25; width: 100%;" width="100%" bgcolor="#1A1F25">
      <tr>
        <td style="font-family: Helvetica; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: Helvetica; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="align-center" style="font-family: Helvetica; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href="https://archived.com.ar" style="color: #ec0867; text-decoration: underline;"><img src="https://firebasestorage.googleapis.com/v0/b/archived-web.appspot.com/o/utils%2Farchived-logo-blanco.png?alt=media&token=24593a8b-f329-44d8-88d0-98678d1a3f6b" height="50" alt="Archived" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">

            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #f2f2f2; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: Helvetica; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: Helvetica; font-size: 14px; vertical-align: top;" valign="top">
                        ${descripcion}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: Helvetica; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">Archived Calle Chacabuco 222, Oncativo, Córdoba, Argentina</span>
                    <br> Visita nuestra web <a href="https://archived.com.ar" style="text-decoration: underline; color: #9a9ea6; font-size: 12px; text-align: center;">aquí</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: Helvetica; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>

    `;
      const to = suscriptores.map((suscriptor) => suscriptor.email);
      const subject = titulo;
      const emailData = { to, subject, html };

      await sendMailRequest(emailData);
      setDescripcion('');
      setTitulo('');
      toast.success('Newsletter enviado');
    } catch (error) {
      console.log(error);
      toast.error('Error al enviar el newsletter');
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      const FetchSubscribe = async () => {
        try {
          const response = await getSuscriptoresRequest();
          setSuscriptores(response.data);
          const suscriptoresOrdenados = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ); // Ordenar por fecha

          // Filtrar los últimos 10 suscriptores
          const ultimosDiez = suscriptoresOrdenados.slice(0, 10);
          setSuscriptores10(ultimosDiez);
        } catch (error) {
          console.log(error);
        }
      };
      FetchSubscribe();
    }
  }, [initialLoad]);

  return (
    <div className='admin-newsletter'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Newsletter | Administracion</title>
        <meta
          name='description'
          content='Pagina de administracion de newsletter'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/administration/newsletter'
        />
      </Helmet>
      <h1>NewSletter</h1>
      <div className='flex gap-[10px]'>
        <section className='admin-newsletter-create'>
          <h2>Crear Newsletter</h2>
          <form className='admin-newsletter-form'>
            <label htmlFor='titulo'>Asunto:</label>
            <input
              type='text'
              id='titulo'
              name='titulo'
              onChange={(e) => setTitulo(e.target.value)}
            />

            <label htmlFor='descripcion'>Mensaje:</label>
            <div className='h-[255px]'>
              <ReactQuill
                value={descripcion}
                onChange={handleDescripcionChange}
                modules={modules}
                formats={formats}
                className='w-[550px] h-[75%] mb-2.5 rounded-[5px] border-solid border-[#00000013]'
              />
            </div>

            <button
              type='submit'
              onClick={handleSendNewsletter}
            >
              Enviar
            </button>
          </form>
        </section>
        <section className='w-full'>
          <table className='newsletter-tabla-subs'>
            <thead>
              <tr>
                <th>Ultimos subscriptores</th>
              </tr>
            </thead>
            <tbody>
              {suscriptores10.map((suscriptor) => (
                <tr key={suscriptor._id}>
                  <td>{suscriptor.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
