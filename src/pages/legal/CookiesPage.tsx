import { InternalPage } from '../../components/layout/InternalPage';
import { Link } from 'react-router-dom';

export const CookiesPage = () => {
  return (
    <InternalPage title="Política de Cookies">
      <p>
        En Binder, utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, 
        analizar el uso del sitio y personalizar el contenido. Esta política explica qué son las cookies, cómo las 
        utilizamos y cómo puede gestionarlas.
      </p>

      <h2>¿Qué son las Cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o móvil) 
        cuando visita un sitio web. Estas cookies permiten que el sitio web recuerde sus acciones y preferencias 
        durante un período de tiempo, por lo que no tiene que volver a configurarlas cada vez que regresa al sitio 
        o navega de una página a otra.
      </p>

      <h2>Tipos de Cookies que Utilizamos</h2>
      <p>
        Utilizamos diferentes tipos de cookies en nuestro sitio web, cada una con un propósito específico:
      </p>

      <h3>1. Cookies Esenciales</h3>
      <p>
        Estas cookies son estrictamente necesarias para el funcionamiento del sitio web. Permiten funciones básicas 
        como la navegación por las páginas y el acceso a áreas seguras del sitio web. El sitio web no puede 
        funcionar correctamente sin estas cookies.
      </p>
      <p><strong>Cookies esenciales que utilizamos:</strong></p>
      <ul>
        <li>
          <code>binder-theme</code> - Almacena su preferencia de tema (modo claro u oscuro). Esta cookie se guarda 
          en localStorage y persiste hasta que la elimine manualmente.
        </li>
        <li>
          <code>binder-background</code> - Almacena su preferencia de fondo visual. Esta cookie se guarda en 
          localStorage y persiste hasta que la elimine manualmente.
        </li>
        <li>
          <code>formSubmission</code> - Almacena temporalmente los datos del formulario de contacto durante la 
          sesión. Esta información se guarda en sessionStorage y se elimina automáticamente cuando cierra el navegador.
        </li>
      </ul>

      <h3>2. Cookies Analíticas</h3>
      <p>
        Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando y 
        reportando información de forma anónima. Utilizamos esta información para mejorar el funcionamiento del sitio.
      </p>
      <p><strong>Proveedor:</strong> Google Analytics</p>
      <p><strong>ID de seguimiento:</strong> G-YR3V5CRVQE</p>
      <p><strong>Cookies analíticas que utilizamos:</strong></p>
      <ul>
        <li>
          <code>_ga</code> - Distingue a los usuarios únicos. Duración: 2 años.
        </li>
        <li>
          <code>_ga_*</code> - Mantiene el estado de la sesión. Duración: 2 años.
        </li>
        <li>
          <code>_gid</code> - Distingue a los usuarios únicos. Duración: 24 horas.
        </li>
      </ul>
      <p>
        Para obtener más información sobre cómo Google utiliza los datos cuando utiliza sitios o aplicaciones de 
        nuestros socios, visite:{' '}
        <a 
          href="https://policies.google.com/technologies/partner-sites" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          https://policies.google.com/technologies/partner-sites
        </a>
      </p>

      <h2>Gestión de Cookies</h2>
      <p>
        Puede gestionar sus preferencias de cookies de las siguientes maneras:
      </p>

      <h3>Configuración en el Sitio Web</h3>
      <p>
        Puede cambiar sus preferencias de cookies en cualquier momento haciendo clic en el botón "Configurar" en 
        el banner de cookies que aparece en su primera visita, o accediendo a la configuración de cookies desde 
        el pie de página.
      </p>

      <h3>Configuración del Navegador</h3>
      <p>
        La mayoría de los navegadores web permiten algún control de la mayoría de las cookies a través de la 
        configuración del navegador. Para obtener más información sobre cómo gestionar las cookies en su navegador, 
        consulte la sección de ayuda de su navegador:
      </p>
      <ul>
        <li>
          <a 
            href="https://support.google.com/chrome/answer/95647" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a 
            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a 
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a 
            href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h3>Desactivar Google Analytics</h3>
      <p>
        Si desea desactivar Google Analytics específicamente, puede hacerlo utilizando la herramienta oficial de 
        Google:{' '}
        <a 
          href="https://tools.google.com/dlpage/gaoptout" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Complemento de inhabilitación para navegadores de Google Analytics
        </a>
      </p>

      <h2>Cookies de Terceros</h2>
      <p>
        Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras páginas. Actualmente, 
        utilizamos Google Analytics como nuestro único servicio de terceros que coloca cookies. No tenemos control 
        sobre estas cookies de terceros, por lo que le recomendamos que consulte los sitios web de terceros para 
        obtener más información sobre sus cookies.
      </p>

      <h2>Actualizaciones de esta Política</h2>
      <p>
        Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en las cookies que 
        utilizamos o por otras razones operativas, legales o regulatorias. Le recomendamos que revise esta página 
        periódicamente para mantenerse informado sobre nuestro uso de cookies.
      </p>
      <p>
        <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>

      <h2>Contacto</h2>
      <p>
        Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos a través de nuestros canales de 
        comunicación oficiales o consultar nuestra{' '}
        <Link to="/legal/privacidad">Política de Privacidad</Link> para obtener más información sobre cómo 
        manejamos sus datos personales.
      </p>
    </InternalPage>
  );
};

