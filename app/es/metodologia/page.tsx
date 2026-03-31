import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Calculamos los Salarios — Metodología",
  description:
    "Usamos estimaciones salariales basadas en datos públicos oficiales, no en bases de datos privadas en tiempo real. Aquí explicamos exactamente cómo calculamos los rangos salariales.",
  alternates: { canonical: "/es/metodologia" },
};

const SECTIONS = [
  {
    id: "origen-datos",
    heading: "De dónde vienen los datos",
    content: (
      <>
        <p>No tenemos acceso a bases de datos salariales de empresas en tiempo real, plataformas de RRHH propietarias ni datos de ofertas de empleo en directo. Queremos ser transparentes al respecto.</p>
        <p>Nuestras estimaciones salariales se construyen a partir de encuestas oficiales de salarios y plataformas de compensación de la comunidad, normalizadas en un único pipeline estructurado:</p>
        <ul>
          <li><strong>Encuestas oficiales de salarios</strong> — INE EES (España), Eurostat SES (UE), Destatis VSE (Alemania) y ONS ASHE (Reino Unido). Son las fuentes estadísticamente más fiables disponibles: muestras grandes, metodología consistente y publicadas bajo licencias de datos abiertos.</li>
          <li><strong>Datos de compensación de Levels.fyi</strong> — curados manualmente a partir de rangos salariales visibles públicamente en la plataforma, usados como señal direccional para roles tecnológicos en grandes ciudades. Datos autodeclarados con sesgo al alza conocido: se tratan como señal del mercado alto, no como mediana.</li>
          <li><strong>Modelado estructurado</strong> — para combinaciones de rol/ciudad donde no tenemos datos directos, recurrimos a un modelo calibrado con multiplicadores de ubicación y experiencia derivados de las encuestas anteriores.</li>
        </ul>
        <p>Todos los registros se normalizan en un esquema unificado y se etiquetan explícitamente con su fuente, ámbito geográfico, nivel de seniority y antigüedad. Las estimaciones solo se producen a partir de este pipeline; no usamos datos sintéticos.</p>
      </>
    ),
  },
  {
    id: "como-estimamos",
    heading: "Cómo estimamos los salarios",
    content: (
      <>
        <p>Cuando consultas un rol y una ciudad, ejecutamos una <strong>búsqueda geográfica de 3 niveles</strong> sobre nuestro conjunto de registros normalizados:</p>
        <ol>
          <li><strong>Registros a nivel de ciudad</strong> — los más específicos y con mayor peso. Por ejemplo, datos regionales del INE para Madrid o registros de Levels.fyi para Barcelona.</li>
          <li><strong>Registros a nivel de país</strong> — datos de encuestas nacionales (p. ej. INE nacional para España, Destatis VSE nacional para Alemania).</li>
          <li><strong>Datos europeos de respaldo</strong> — datos agregados de Eurostat SES, usados solo cuando no existen registros específicos del país para una combinación.</li>
        </ol>
        <p>Cada registro se pondera por <strong>cuatro factores</strong>: fiabilidad de la fuente (las encuestas gubernamentales tienen el mayor peso), actualidad de los datos (decrecimiento de ~15% por año), especificidad geográfica (ciudad &gt; país &gt; Europa) y confianza en la normalización del rol (qué tan bien encaja el código de ocupación en nuestra definición de rol).</p>
        <p>Si los registros disponibles no coinciden exactamente con el seniority consultado, aplicamos una <strong>curva de experiencia</strong> — una función no lineal suave (spline de Hermite) calibrada a partir de datos observados del mercado tecnológico europeo. El nivel inicial es aproximadamente el 58% del mercado medio; 15 años de experiencia equivalen a aproximadamente el 148%.</p>
        <p>El resultado es un rango <strong>bajo / mediano / alto</strong> (P25/P50/P75 ponderados entre los registros que contribuyen) y una estimación del percentil en el que se sitúa tu salario.</p>
      </>
    ),
  },
  {
    id: "integridad-pais",
    heading: "Integridad de datos por país",
    content: (
      <>
        <p>Aplicamos una asignación estricta de país a fuente. Los datos del Reino Unido nunca se usan para estimar salarios de la UE, y viceversa.</p>
        <ul>
          <li><strong>Estimaciones para España</strong> se calibran a partir de la Encuesta de Estructura Salarial del INE (encuesta gubernamental española). Los datos de Eurostat no se usan para estas ubicaciones.</li>
          <li><strong>Estimaciones para el resto de Europa continental</strong> (Alemania, Francia, Países Bajos, Irlanda) se calibran a partir de la Encuesta de Estructura Salarial de Eurostat. Los datos del INE no se usan para estas ubicaciones.</li>
          <li><strong>Estimaciones para roles tecnológicos</strong> en grandes ciudades (Madrid, Barcelona, Berlín, Ámsterdam, París, Dublín) se cruzan adicionalmente con datos de compensación de Levels.fyi, que tiene buena cobertura del mercado tecnológico europeo.</li>
          <li><strong>Los datos salariales de Glassdoor</strong> se usan solo como verificación secundaria de dirección, no como entrada principal. Se aplican por país con un peso de 0,55× frente a 0,80–0,90× para fuentes gubernamentales. <em>Indeed no está integrado actualmente.</em></li>
        </ul>
        <p>Este mapeo se mantiene explícitamente en nuestra capa de datos y se valida en el momento de compilación para evitar mezclas accidentales entre países.</p>
      </>
    ),
  },
  {
    id: "fuentes",
    heading: "Fuentes de datos",
    content: (
      <>
        <p>Nuestro pipeline salarial utiliza las siguientes fuentes disponibles públicamente, cada una etiquetada con su ámbito geográfico y método de ingesta:</p>
        <ul>
          <li><strong>INE Encuesta de Estructura Salarial 2024</strong> (ine-ees) — Encuesta nacional de estructura salarial de España. Códigos de ocupación CNO-11. Incluye desglose regional de la Comunidad de Madrid y Cataluña (usado para Madrid y Barcelona). Se requiere atribución al INE. <em>Solo España.</em></li>
          <li><strong>Eurostat Structure of Earnings Survey 2022</strong> (eurostat-ses) — Datos de ingresos por estados miembros de la UE por ocupación ISCO-08, tamaño de empresa y país. Cubre DE, NL, ES, FR, IE y otros. Se publica cada 4 años; próxima edición 2026. <em>Mercados europeos continentales.</em></li>
          <li><strong>Destatis Verdienststrukturerhebung 2024</strong> (destatis-vse) — Encuesta de estructura salarial nacional de Alemania. Códigos de ocupación KldB 2010. Incluye desglose del estado federal de Berlín. <em>Solo Alemania.</em></li>
          <li><strong>UK ONS ASHE 2025</strong> (ons-uk) — Annual Survey of Hours and Earnings. Códigos de ocupación SOC 2020. Cubre el pago bruto anual nacional del Reino Unido y regional de Londres. <em>Solo ubicaciones del Reino Unido.</em></li>
          <li><strong>CBS Arbeidsrekening 2024</strong> (cbs-nl) — Estadísticas del mercado laboral de los Países Bajos. Cubre ingresos brutos por ocupación y sector. <em>Solo Países Bajos.</em></li>
          <li><strong>CSO Earnings and Labour Costs 2024</strong> (cso-ie) — Encuesta de ingresos de la Oficina Central de Estadística de Irlanda. Cubre ingresos brutos anuales por ocupación. <em>Solo Irlanda.</em></li>
          <li><strong>INSEE DADS 2024</strong> (insee-fr) — Declaración Anual de Datos Sociales de Francia. Cubre el salario bruto anual por ocupación y región. <em>Solo Francia.</em></li>
          <li><strong>BFS Lohnstrukturerhebung 2024</strong> (bfs-ch) — Encuesta de estructura salarial de la Oficina Federal de Estadística de Suiza. <em>Solo Suiza.</em></li>
          <li><strong>SCB Lönestrukturstatistik 2024</strong> (scb-se) — Encuesta de ingresos de Statistics Sweden. <em>Solo Suecia.</em></li>
          <li><strong>Istat Indagine Retribuzioni 2024</strong> (istat-it) — Encuesta de ingresos laborales del Instituto Nacional de Estadística de Italia. <em>Solo Italia.</em></li>
          <li><strong>GUS Struktura Wynagrodzeń 2024</strong> (gus-pl) — Encuesta de estructura salarial de la Oficina Central de Estadística de Polonia. <em>Solo Polonia.</em></li>
          <li><strong>Levels.fyi 2024</strong> (levels-fyi) — Curado manualmente a partir de rangos salariales visibles públicamente. Representativo de empresas tecnológicas más grandes y empleadores por encima de la mediana del mercado. Los datos autodeclarados tienen un sesgo al alza conocido — se usan como señal del mercado alto para roles de ingeniería, producto y datos. <em>No se usa para roles no tecnológicos.</em></li>
        </ul>
        <p>Las encuestas gubernamentales tienen el mayor peso en nuestro pipeline. Levels.fyi tiene un peso de aproximadamente 0,65× frente a 0,80–0,90× para fuentes de estadísticas nacionales. Los datos salariales de Glassdoor se usan como verificación secundaria de dirección con un peso de 0,55× y no son un factor principal.</p>
      </>
    ),
  },
  {
    id: "nivel-confianza",
    heading: "Nivel de fiabilidad",
    content: (
      <>
        <p>Asignamos un nivel de fiabilidad — <strong>Alta</strong>, <strong>Media</strong> o <strong>Baja</strong> — a cada estimación, calculado directamente a partir de los datos del pipeline usados para producirla. No es una etiqueta heurística; se deriva de seis factores medidos:</p>
        <ul>
          <li><strong>Diversidad de fuentes</strong> — cuántas fuentes distintas contribuyeron. Una sola fuente = media como máximo.</li>
          <li><strong>Número de registros</strong> — cuántos registros normalizados coincidieron con la consulta. Menos registros = menor fiabilidad.</li>
          <li><strong>Actualidad</strong> — qué tan recientes son los datos. Las encuestas gubernamentales se realizan cada 4 años; la actualidad decrece un 15% por año desde la fecha de publicación.</li>
          <li><strong>Especificidad geográfica</strong> — los datos a nivel de ciudad tienen la puntuación más alta; el respaldo europeo, la más baja.</li>
          <li><strong>Coincidencia de seniority</strong> — si existen registros para el seniority exacto consultado o si tuvimos que interpolar usando la curva de experiencia.</li>
          <li><strong>Profundidad de respaldo</strong> — si llegamos al nivel de respaldo europeo, lo que significa que no había datos específicos del país disponibles.</li>
        </ul>
        <p>La fiabilidad alta requiere una puntuación compuesta ≥ 0,75 en estos factores. Media es 0,45–0,74. Fiabilidad baja significa que la estimación se basa en datos escasos o indirectos — úsala solo como referencia aproximada.</p>
      </>
    ),
  },
  {
    id: "limitaciones",
    heading: "Limitaciones",
    content: (
      <>
        <p>Creemos que la transparencia aquí es importante. Hay limitaciones reales que debes tener en cuenta:</p>
        <ul>
          <li><strong>No todos los sectores están bien representados.</strong> Nuestras estimaciones son más sólidas para roles de tecnología, producto, marketing, ventas y operaciones. Los roles legales, ejecutivos, de asesoría financiera y altamente especializados no están bien modelados.</li>
          <li><strong>No tenemos en cuenta el tamaño o etapa de la empresa.</strong> Un ingeniero senior en una startup en fase inicial y uno en una gran empresa no cobran lo mismo. Nuestras estimaciones reflejan una media amplia del mercado, no un tipo de empresa específico.</li>
          <li><strong>No incluimos equity, bonus ni beneficios.</strong> La compensación total puede ser significativamente mayor que el salario base, especialmente en tecnología. Nuestra herramienta solo estima el salario bruto anual base.</li>
          <li><strong>Los datos no son en tiempo real.</strong> Actualizamos el modelo periódicamente, pero los salarios pueden cambiar rápidamente en mercados en movimiento.</li>
          <li><strong>Los valores de divisa no son tipos de cambio en directo.</strong> Las estimaciones del Reino Unido están en GBP; las europeas en EUR. No aplicamos tipos de cambio en tiempo real entre ellas.</li>
        </ul>
      </>
    ),
  },
  {
    id: "por-que-es-util",
    heading: "Por qué sigue siendo útil",
    content: (
      <>
        <p>A pesar de estas limitaciones, comparar tu salario es genuinamente útil, incluso con estimaciones modeladas.</p>
        <p>La mayoría de las personas no tienen ninguna referencia externa sobre su salario. Aceptaron una oferta, recibieron incrementos anuales y no saben si están en el percentil 30 o en el 80 para su rol. Esa asimetría favorece a los empleadores.</p>
        <p>Nuestra herramienta te da una señal direccional. Si nuestro modelo sitúa tu salario actual en el 25% inferior para tu rol y ciudad, ese es un dato relevante, aunque la mediana exacta difiera en unos miles de euros. Te indica que hay una conversación que merece la pena tener.</p>
        <p>Para una visión más precisa, te recomendamos combinar nuestra estimación con:</p>
        <ul>
          <li>Ofertas de trabajo para roles similares en tu ciudad</li>
          <li>Conversaciones con recruiters que puedan compartir tarifas de mercado actuales</li>
          <li>Debates salariales en tu red profesional</li>
          <li>Datos de encuestas salariales publicados por organismos gubernamentales</li>
        </ul>
        <p>Nuestro objetivo es darte suficiente señal para iniciar la conversación, con tu manager, un recruiter o contigo mismo.</p>
      </>
    ),
  },
];

export default function MetodologiaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/es/" className="hover:text-orange-500 transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-gray-600">Metodología</span>
      </nav>

      <header className="mb-12 space-y-4">
        <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          Cómo trabajamos
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Cómo calculamos las estimaciones salariales
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Creemos en ser honestos sobre lo que sabemos y lo que no. Esta página explica de dónde vienen nuestros datos salariales y cómo los modelamos.
        </p>
      </header>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-12 space-y-3">
        <h2 className="font-bold text-gray-900">La versión corta</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          Nuestras estimaciones salariales se basan en <strong>referencias públicas y modelado estructurado</strong>. No usamos feeds de datos de empresas en tiempo real ni bases de datos salariales propietarias. Nuestros números están diseñados para darte una señal direccional, no una cifra legalmente precisa.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          {["Datos salariales oficiales", "Referencias del sector", "Modelado por experiencia", "Ajustes por ciudad"].map((tag) => (
            <span key={tag} className="text-xs font-semibold bg-white border border-orange-200 text-orange-700 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      <nav className="mb-12 space-y-1 border-l-2 border-orange-100 pl-4">
        {SECTIONS.map(({ id, heading }) => (
          <a key={id} href={`#${id}`} className="block text-sm text-gray-500 hover:text-orange-600 py-0.5 transition-colors">{heading}</a>
        ))}
      </nav>

      <div className="space-y-14">
        {SECTIONS.map(({ id, heading, content }) => (
          <section key={id} id={id} className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{heading}</h2>
            <div className="prose prose-gray prose-sm max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-3 prose-li:text-gray-600 prose-li:mb-1 prose-ul:space-y-1 prose-ol:space-y-1 prose-strong:text-gray-800 prose-strong:font-semibold">
              {content}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-gray-900 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">¿Listo para comprobar tu sueldo?</h2>
        <p className="text-gray-400 text-sm">30 segundos. Sin email. Sin registro.</p>
        <Link href="/es/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          Comprobar mi sueldo →
        </Link>
      </div>
    </div>
  );
}
