import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo SalaryVerdict recoge, usa y protege tus datos.",
  alternates: { canonical: "/es/privacidad" },
};

const LAST_UPDATED = "27 de marzo de 2026";

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-400">Última actualización: {LAST_UPDATED}</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-sm leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">1. Quiénes somos</h2>
          <p>
            SalaryVerdict (<strong>salaryverdict.com</strong>) es una herramienta gratuita de comparativa salarial para profesionales europeos.
            A efectos del RGPD y la legislación de protección de datos aplicable, somos el responsable del tratamiento de cualquier
            dato personal recopilado a través de este sitio web.
          </p>
          <p>
            Contacto:{" "}
            <a href="mailto:hello@salaryverdict.com" className="text-orange-500 hover:underline">
              hello@salaryverdict.com
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">2. Qué datos recogemos y por qué</h2>

          <h3 className="font-semibold text-gray-800">Datos introducidos en la herramienta salarial</h3>
          <p>
            Cuando usas el comparador salarial (puesto, ciudad, años de experiencia, salario actual), estos datos se
            procesan íntegramente en tu navegador. No transmitimos ni almacenamos tus datos salariales en ningún servidor.
            Tus resultados nunca nos son enviados.
          </p>

          <h3 className="font-semibold text-gray-800">Analítica (Google Analytics 4)</h3>
          <p>
            Con tu consentimiento, usamos Google Analytics 4 para entender cómo los visitantes usan el sitio — por ejemplo,
            qué páginas se visitan, cuánto tiempo permanecen los usuarios y qué acciones realizan (como completar la
            consulta salarial). Estos datos son anónimos y agregados. No contienen información personal identificable.
          </p>
          <p>
            La analítica solo se activa tras hacer clic en &ldquo;Aceptar analítica&rdquo; en el banner de cookies.
            Si la rechazas, no se instalan cookies de analítica y no se envían datos de seguimiento a Google.
          </p>
          <p>
            Google Analytics está sujeto a la política de privacidad de Google:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              policies.google.com/privacy
            </a>
          </p>

          <h3 className="font-semibold text-gray-800">Suscripción por email</h3>
          <p>
            Si decides suscribirte a actualizaciones salariales desde la pantalla de resultados, recogemos tu dirección de email.
            Esta se utiliza únicamente para enviarte contenido mensual sobre salarios y negociación. No vendemos, alquilamos ni
            compartimos tu dirección de email con terceros con fines de marketing.
          </p>
          <p>
            Las suscripciones por email se gestionan a través de Netlify Forms. Puedes darte de baja en cualquier momento haciendo clic
            en el enlace de cancelación de cualquier email que te enviemos, o escribiendo a{" "}
            <a href="mailto:hello@salaryverdict.com" className="text-orange-500 hover:underline">
              hello@salaryverdict.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">3. Cookies</h2>
          <p>Utilizamos las siguientes cookies:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Cookie</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Finalidad</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Duración</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Requiere consentimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200"><code>sv_cookie_consent</code></td>
                  <td className="p-2 border border-gray-200">Guarda tu preferencia de cookies</td>
                  <td className="p-2 border border-gray-200">1 año</td>
                  <td className="p-2 border border-gray-200">No (funcional)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200"><code>salary_verdict_saved</code></td>
                  <td className="p-2 border border-gray-200">Recuerda localmente tu última consulta salarial</td>
                  <td className="p-2 border border-gray-200">Sesión del navegador</td>
                  <td className="p-2 border border-gray-200">No (funcional)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200"><code>_ga, _ga_*</code></td>
                  <td className="p-2 border border-gray-200">Google Analytics — distingue usuarios y sesiones</td>
                  <td className="p-2 border border-gray-200">2 años</td>
                  <td className="p-2 border border-gray-200">Sí</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Puedes retirar tu consentimiento a la analítica en cualquier momento borrando las cookies del navegador o contactándonos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">4. Base jurídica del tratamiento</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Analítica:</strong> Consentimiento (Art. 6.1.a RGPD)</li>
            <li><strong>Suscripción por email:</strong> Consentimiento (Art. 6.1.a RGPD)</li>
            <li><strong>Datos de la herramienta salarial:</strong> Procesados localmente en tu navegador — no se transmite ningún dato personal</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">5. Conservación de datos</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Datos de analítica:</strong> Conservados 14 meses en Google Analytics (nuestro período de retención configurado)</li>
            <li><strong>Direcciones de email:</strong> Conservadas hasta que te des de baja o solicites su eliminación</li>
            <li><strong>Preferencia de cookies:</strong> Almacenada localmente en tu navegador durante 1 año</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">6. Tus derechos</h2>
          <p>En virtud del RGPD (si te encuentras en el Reino Unido o el EEE), tienes derecho a:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Acceder a los datos personales que tenemos sobre ti</li>
            <li>Solicitar la corrección de datos inexactos</li>
            <li>Solicitar la supresión de tus datos (&ldquo;derecho al olvido&rdquo;)</li>
            <li>Retirar el consentimiento en cualquier momento (sin afectar al tratamiento previo)</li>
            <li>Presentar una reclamación ante la autoridad supervisora nacional (p. ej. AEPD en España, ICO en el Reino Unido)</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escribe a{" "}
            <a href="mailto:hello@salaryverdict.com" className="text-orange-500 hover:underline">
              hello@salaryverdict.com
            </a>
            . Responderemos en un plazo de 30 días.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">7. Servicios de terceros</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Google Analytics 4</strong> — analítica (requiere consentimiento). Operado por Google Ireland Limited.</li>
            <li><strong>Netlify</strong> — alojamiento web y procesamiento de formularios. Operado por Netlify, Inc.</li>
            <li><strong>Netlify Forms</strong> — recogida de emails. Datos almacenados por Netlify, Inc.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">8. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente. La fecha de &ldquo;última actualización&rdquo; al inicio de esta
            página refleja la revisión más reciente. Los cambios relevantes se indicarán de forma destacada.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-100">
          <Link href="/es/" className="text-orange-500 hover:underline text-sm font-medium">
            ← Volver a SalaryVerdict
          </Link>
        </div>
      </div>
    </div>
  );
}
