export interface BlogPostES {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
}

export const BLOG_POSTS_ES: BlogPostES[] = [
  {
    slug: "como-saber-si-cobras-poco",
    title: "Cómo saber si cobras poco",
    description: "La mayoría de profesionales sospecha que cobra por debajo del mercado pero nunca lo verifica. Aquí tienes cómo comprobarlo — y qué hacer al respecto.",
    date: "2026-03-01",
    readTime: "10 min de lectura",
    content: `
      <p>La mayoría de profesionales tiene la sensación de que cobra menos de lo que debería. Pero las sensaciones no consiguen subidas de sueldo. Los datos, sí. El problema es que la mayoría nunca llega a comprobarlo: asumen que su empresa les paga con justicia, aceptan el aumento anual del 2-3%, y no se preguntan si el mercado los ha dejado atrás.</p>
      <p>Y muchas veces lo ha hecho. La compresión salarial es uno de los problemas estructurales más persistentes del empleo: las empresas optimizan lo que pagan a los nuevos empleados (donde el mercado fija el precio) mientras que el salario de los empleados existentes va quedando por debajo del mercado año tras año.</p>
      <p>Esta guía explica exactamente cómo saber si cobras poco — usando señales reales, datos de mercado y un método claro para interpretar lo que encuentres.</p>

      <h2>El método principal: compara con el mercado</h2>
      <p>La forma más directa de saber si cobras poco es comparar tu salario actual con lo que el mercado paga para tu rol específico, tu ubicación y tu nivel de experiencia. No lo que tú crees que vales. No lo que cobra tu compañero. Lo que el mercado — la distribución de empresas que están pagando activamente por personas con tus habilidades y experiencia — realmente paga.</p>
      <p>Esto suena sencillo, pero la mayoría no lo hace porque no saben dónde encontrar datos fiables. Las fuentes más útiles para España son:</p>
      <ul>
        <li><strong>Nuestra <a href="/es/">calculadora gratuita</a></strong> — te da el percentil de mercado para tu rol y ciudad en 30 segundos, basado en datos salariales oficiales del INE y Eurostat.</li>
        <li><strong>INE (Instituto Nacional de Estadística)</strong> — la Encuesta de Estructura Salarial, publicada periódicamente. El conjunto de datos estadístico más riguroso para salarios en España por ocupación.</li>
        <li><strong>Eurostat SES</strong> — la Encuesta de Estructura Salarial de la UE, con cobertura de todas las economías europeas principales.</li>
        <li><strong>Encuestas salariales sectoriales</strong> — muchos sectores (tecnología, finanzas, ingeniería) publican informes anuales de salarios que son útiles para benchmarking específico.</li>
      </ul>
      <p>Un único dato de una de estas fuentes es orientativo. Dos o tres que convergen en un rango similar son suficientes para actuar.</p>

      <h2>Entender tu percentil</h2>
      <p>Las herramientas de benchmarking expresan tu posición como un percentil — dónde se sitúa tu salario dentro de la distribución de pagos para roles comparables. El percentil es más informativo que una simple comparación superior/inferior porque indica la magnitud de cualquier diferencia.</p>
      <ul>
        <li><strong>Por debajo del percentil 25:</strong> Ganas menos que tres cuartas partes de personas en roles comparables. Esta es una brecha significativa que merece atención urgente.</li>
        <li><strong>Percentil 25-40:</strong> Por debajo del mercado, pero no de forma grave. Una conversación sobre aumento está justificada.</li>
        <li><strong>Percentil 40-60:</strong> En línea con el mercado. Estás en el rango de lo que la mayoría de empresas paga para tu rol.</li>
        <li><strong>Por encima del percentil 60:</strong> Bien retribuido en relación con tus compañeros del sector.</li>
      </ul>

      <h2>Cinco señales de que cobras poco</h2>
      <p>Más allá de las herramientas de mercado, hay señales observables en tu vida profesional que pueden indicar una brecha salarial antes de que la hayas benchmarkeado formalmente.</p>

      <h3>1. No has tenido una subida real en dos o más años</h3>
      <p>Un ajuste por coste de vida del 2-3% no es una subida. Es la empresa aproximándose a la inflación. Si tu salario solo se ha ajustado a tasas de inflación durante dos o más años — mientras tus responsabilidades han crecido, tus habilidades se han profundizado y el mercado para tu rol ha evolucionado — la brecha entre tu salario y lo que costaría contratar a alguien nuevo probablemente se ha ampliado.</p>

      <h3>2. Los recruiters te ofrecen habitualmente roles con sueldos significativamente mayores</h3>
      <p>Los recruiters tienen un incentivo incorporado para hacer ofertas realistas — cobran por las colocaciones y no perderán el tiempo con candidatos que no pueden cerrar. Cuando un recruiter se pone en contacto y menciona un rol con un 25% más que tu salario actual, no te está halagando. Te está diciendo lo que el mercado cree que vales.</p>
      <p>Apunta las conversaciones entrantes: la empresa, el rol y el rango salarial mencionado. Tres enfoques separados ofreciendo materialmente más que tu salario actual son inteligencia de mercado. Úsala.</p>

      <h3>3. Sabes o sospechas que compañeros más nuevos cobran más que tú</h3>
      <p>La compresión salarial es el fenómeno por el que el salario de los empleados existentes cae por debajo de lo que cobran los nuevos, porque las contrataciones tienen precio de mercado pero los ajustes de retención son poco frecuentes. Es extremadamente común en España y en toda Europa.</p>

      <h3>4. Tu rol ha crecido pero tu salario no</h3>
      <p>Las descripciones de trabajo evolucionan. Cuando entraste, eras responsable de X. Dos años después eres responsable de X, Y y Z — pero tu salario refleja el alcance original. Esta es una de las formas más comunes de infrapago: el título no ha cambiado, el rol se ha expandido, el salario no ha seguido el ritmo.</p>

      <h3>5. Rindes consistentemente por encima de lo esperado sin que la compensación suba</h3>
      <p>Si tus últimas dos o tres evaluaciones te han valorado por encima de las expectativas y tu compensación no se ha movido de forma significativa, algo está fallando en el sistema de retroalimentación. Las empresas con buen funcionamiento deberían traducir las calificaciones de rendimiento sólidas en ajustes de compensación por encima del estándar.</p>

      <h2>Por qué la brecha sigue creciendo si no actúas</h2>
      <p>El infrapago se compone. Una brecha de 3.000 € este año es una brecha de 3.000 € que se convierte en la base para el aumento porcentual del año que viene. A lo largo de cinco años, con revisiones anuales del 3% estándar aplicadas a la base inferior, la brecha se amplía sin que nadie tome una decisión específica para seguir pagándote menos.</p>

      <h2>Qué hacer cuando sabes que cobras poco</h2>
      <p>Una vez que tienes los datos, el camino depende de lo grande que sea la brecha.</p>
      <p><strong>Brecha inferior al 10-12%:</strong> Una conversación interna sobre un aumento es tu primer movimiento. Ven con tu percentil de mercado, tus contribuciones y un número específico.</p>
      <p><strong>Brecha del 15-25%:</strong> La negociación interna sigue valiendo la pena, pero sé realista en cuanto a que las empresas raramente aprueban aumentos en un solo paso de esta magnitud. Un enfoque por fases es más probable que funcione. Una oferta competidora refuerza enormemente tu posición.</p>
      <p><strong>Brecha superior al 25%:</strong> Este nivel de compresión habitualmente solo se puede corregir saliendo al mercado. La banda de compensación de la empresa puede tener un techo que no permite la corrección interna. Explorar opciones externas te da datos reales y palanca real.</p>

      <h2>Lo que hace que todo lo demás sea más fácil</h2>
      <p>Cada negociación, cada conversación sobre un aumento, cada búsqueda de empleo es más fácil cuando empiezas con datos precisos del mercado. Sin ellos, estás argumentando desde la sensación. Con ellos, estás argumentando desde los hechos.</p>
      <p><a href="/es/">Comprueba tu valor de mercado ahora</a> — tarda 30 segundos. Consulta tu percentil, consulta la brecha si existe y empieza desde una posición de información.</p>
    `,
  },
  {
    slug: "consejos-negociacion-salarial",
    title: "7 consejos de negociación salarial que funcionan de verdad",
    description: "Negociar tu salario es la acción con mayor retorno que puedes tomar. Aquí tienes 7 consejos prácticos para conseguir más.",
    date: "2026-03-05",
    readTime: "13 min de lectura",
    content: `
      <p>Negociar tu salario es la acción con mayor retorno que la mayoría de profesionales nunca lleva a cabo. Los estudios demuestran de forma consistente que las personas que negocian su salario de entrada ganan significativamente más a lo largo de su carrera que quienes no lo hacen — simplemente porque todos los aumentos futuros se componen sobre una base más alta. Y sin embargo, la mayoría acepta el primer número que le ofrecen.</p>
      <p>La razón no es codicia ni pereza. Es incomodidad. Hablar de dinero se siente presuntuoso, arriesgado, incluso ingrato. Pero esa incomodidad te está costando dinero real — y cada año que permaneces en silencio te cuesta más.</p>
      <p>Estos siete principios no harán que negociar te resulte fácil. Pero sí lo harán efectivo.</p>

      <h2>Por qué la mayoría de negociaciones fracasan antes de empezar</h2>
      <p>La razón más común por la que las negociaciones salariales fracasan es la preparación, no la ejecución. La gente entra sin saber lo que vale, sin un número específico preparado y sin una comprensión clara de qué hará si la respuesta es no.</p>
      <p>Antes de aplicar cualquiera de los consejos siguientes, necesitas tres cosas: (1) tu valor de mercado, (2) un número específico al que apuntas, y (3) una idea clara de tu posición de salida. Sin estas, los consejos son solo tácticas sin estrategia.</p>

      <h2>Consejo 1: Conoce tu percentil antes de entrar</h2>
      <p>El error más costoso en la negociación salarial es ir sin datos. "Creo que merezco más" no es un argumento — es una queja. "Según los datos del INE y las encuestas salariales del sector, el percentil 50 para este rol en Madrid es de X€, y actualmente estoy en el percentil 32" es un argumento.</p>
      <p>Usa nuestra <a href="/es/">calculadora gratuita</a> para obtener tu percentil antes de cualquier conversación salarial. Cuando entras con datos específicos de fuentes verificables, cambias el tono de la conversación de emocional a analítico. La mayoría de los managers responde mejor a los datos que a las afirmaciones.</p>

      <h2>Consejo 2: Nombra un número, no un rango</h2>
      <p>Cuando nombras un rango — "busco entre 45.000 y 52.000 €" — la otra parte anda al número inferior. La banda tiene un único propósito práctico para ellos: encontrar el piso.</p>
      <p>Nombra un número específico. No 50.000 € sino 51.500 €. La especificidad señala que has hecho los cálculos, no que has lanzado una cifra al azar. Y ancla la conversación más cerca de lo que realmente quieres.</p>

      <h2>Consejo 3: Deja que la primera oferta aterrice completamente</h2>
      <p>Cuando recibes una oferta o contraoferta, la tendencia natural es responder de inmediato. Resiste. Deja que el número repose en el aire. Di: "Gracias, lo consideraré". El silencio no es debilidad — es una táctica de negociación legítima.</p>
      <p>La mayoría de las personas que hacen ofertas sienten la presión del silencio y lo llenan. A veces eso significa mejoras voluntarias antes de que hayas dicho una sola palabra.</p>

      <h2>Consejo 4: Negocia el paquete completo, no solo el salario base</h2>
      <p>El salario base es solo un componente de la compensación total. Si el salario base no puede moverse tanto como necesitas, hay otros elementos que a menudo tienen más flexibilidad:</p>
      <ul>
        <li>Bonus o variable sobre objetivos</li>
        <li>Días de vacaciones adicionales</li>
        <li>Días de trabajo remoto</li>
        <li>Presupuesto para formación y desarrollo</li>
        <li>Fecha de revisión salarial adelantada (por ejemplo, a los 6 meses en lugar de a los 12)</li>
        <li>Tickets restaurante, seguro médico, plan de pensiones</li>
      </ul>
      <p>Conocer lo que vale cada beneficio te permite hacer intercambios inteligentes. Una revisión en 6 meses con un objetivo claro de subida puede valer más a largo plazo que un salario base ligeramente superior ahora.</p>

      <h2>Consejo 5: Utiliza el mercado externo como validación, no como amenaza</h2>
      <p>Una oferta competidora es la herramienta de negociación más poderosa que existe. Pero la forma en que la introduces importa. Presentarla como una amenaza ("Tengo otra oferta y me marcho si no igualas") crea animosidad. Presentarla como información de mercado ("He recibido una oferta de X€ que me ayuda a entender lo que el mercado valora actualmente mis habilidades") posiciona la conversación como colaborativa.</p>
      <p>El objetivo no es ganar la negociación. Es llegar a un acuerdo que sea justo para ambas partes — y que puedas defender con datos.</p>

      <h2>Consejo 6: Prepara tu respuesta al "no presupuesto ahora"</h2>
      <p>La objeción más común que escucharás es la de presupuesto: "Me encantaría pagarte más pero no hay presupuesto ahora mismo". Esta afirmación puede ser completamente cierta, parcialmente cierta o una táctica. Necesitas saber cómo responder en cualquier caso.</p>
      <p>Respuesta práctica: "Lo entiendo. ¿Podemos acordar un camino claro hacia X€ en una revisión en 6 meses, ligado a objetivos específicos que podamos definir juntos?" Esto convierte un no en un sí condicional — y te da un punto de referencia documentado para la próxima conversación.</p>

      <h2>Consejo 7: Documenta todo por escrito</h2>
      <p>Las conversaciones verbales se olvidan, se malinterpretan o se niegan. Cualquier acuerdo al que llegues — en el salario, en los beneficios, en los calendarios de revisión, en los objetivos ligados a aumentos futuros — debe confirmarse por escrito. Un correo electrónico de seguimiento sencillo ("Como acordamos en nuestra conversación de hoy...") es suficiente y crea un registro que protege a ambas partes.</p>

      <h2>El principio subyacente</h2>
      <p>Todos estos consejos descansan sobre un principio: la negociación no es un conflicto, es una conversación estructurada sobre valor. Tu trabajo es articular claramente el valor que aportas, respaldado por datos de mercado, y llegar a un acuerdo que refleje ese valor.</p>
      <p>Empieza por saber lo que vale el mercado. <a href="/es/">Comprueba tu percentil salarial ahora</a> — tarda 30 segundos.</p>
    `,
  },
  {
    slug: "salarios-espana-cuanto-se-cobra",
    title: "Salarios en España: cuánto se cobra de verdad en 2026",
    description: "Un análisis honesto de los sueldos reales en España por sector, ciudad y nivel de experiencia — con datos del INE y las principales encuestas salariales.",
    date: "2026-03-10",
    readTime: "12 min de lectura",
    content: `
      <p>El salario medio en España según el INE se sitúa en torno a los 28.000–29.000 € brutos anuales. Pero esa cifra dice muy poco sobre lo que tú, específicamente, deberías ganar. La mediana agregada mezcla a un jornalero agrícola en Extremadura con un ingeniero de software senior en Madrid — y el resultado no es útil para nadie.</p>
      <p>Lo que importa es lo que se paga en tu sector, en tu ciudad y en tu nivel de experiencia. Este artículo desglosa los datos reales.</p>

      <h2>La gran brecha: Madrid y Barcelona vs. el resto</h2>
      <p>La diferencia salarial entre las dos grandes ciudades y el resto del país es sustancial. Un software engineer con 5 años de experiencia puede ganar un 35-45% más en Madrid que en una ciudad mediana como Zaragoza o Valladolid para el mismo puesto y empresa. Las razones son múltiples: mayor concentración de multinacionales, mayor competencia por el talento, y mayor coste de vida que las empresas comparten parcialmente con sus empleados.</p>
      <p>Barcelona presenta una dinámica similar a Madrid, aunque con algunas diferencias sectoriales: el ecosistema tecnológico y startup es especialmente fuerte, y hay sectores como turismo, moda y diseño donde los salarios barceloneses lideran el país.</p>
      <p>Valencia, Bilbao y Sevilla están desarrollando ecosistemas propios — especialmente en tecnología — y la brecha se está cerrando en ciertos perfiles, pero todavía existe.</p>

      <h2>Tecnología: el sector con mayor dispersión salarial</h2>
      <p>El sector tecnológico en España presenta la mayor varianza salarial de cualquier sector. La diferencia entre un junior recién salido y un senior con 8 años puede ser de 3x o más. Y la diferencia entre una empresa de producto internacional y una consultora tradicional puede ser del 40-60% para el mismo perfil técnico.</p>
      <p>Rangos aproximados para perfiles técnicos en Madrid/Barcelona (2026):</p>
      <ul>
        <li><strong>Software Engineer Junior (0-2 años):</strong> 24.000–32.000 € brutos</li>
        <li><strong>Software Engineer Mid (3-6 años):</strong> 38.000–55.000 € brutos</li>
        <li><strong>Software Engineer Senior (7+ años):</strong> 55.000–80.000 € brutos</li>
        <li><strong>Tech Lead / Principal Engineer:</strong> 70.000–100.000 € brutos</li>
        <li><strong>Engineering Manager:</strong> 75.000–110.000 € brutos</li>
      </ul>
      <p>Los salarios de las empresas con sede en Estados Unidos o UK que contratan en España tienden a situarse en el extremo superior o incluso superarlo — es uno de los efectos del trabajo remoto global sobre el mercado salarial español.</p>

      <h2>Finanzas: sólido, con mayor dispersión entre banca y fintech</h2>
      <p>El sector financiero español es uno de los que mejor paga en términos absolutos, pero con una división notable entre la banca tradicional y las fintech. Los bancos grandes como Santander, BBVA o CaixaBank tienen estructuras salariales estables con buenos paquetes de beneficios (pensiones, seguro médico, préstamos ventajosos) pero sueldos base que a menudo quedan por debajo de lo que paga el sector tech para perfiles comparables en términos de sofisticación del trabajo.</p>
      <p>Las fintech y neobancos, especialmente los de escala europea o global, pagan de forma más similar al sector tech.</p>

      <h2>Marketing y comunicación: alta varianza, baja transparencia</h2>
      <p>El sector de marketing y comunicación en España tiene una de las distribuciones salariales más amplias y menos transparentes. Un director de marketing en una empresa mediana puede ganar entre 50.000 y 90.000 € dependiendo del sector, el tamaño de la empresa, y si hay componente variable.</p>
      <p>La especialización importa mucho: un perfil de growth marketing con conocimientos técnicos (Python, SQL, atribución) puede cobrar significativamente más que un perfil generalista de marketing de contenidos.</p>

      <h2>Por qué los salarios publicados en ofertas de empleo son engañosos</h2>
      <p>Las ofertas de empleo en España son notoriamente opacas. La mayoría no publica rangos salariales, y las que lo hacen a menudo publican el extremo inferior del rango para filtrar candidatos. El salario real que ofrecen a los candidatos seleccionados suele estar significativamente por encima del publicado.</p>
      <p>Esto significa que las plataformas de empleo son malos benchmarks para saber qué pagaría una empresa. Son mejores las encuestas salariales, los datos del INE y las herramientas como <a href="/es/">SalaryVerdict</a> que agregan datos de múltiples fuentes verificadas.</p>

      <h2>El impacto real de la experiencia</h2>
      <p>En la mayoría de los sectores en España, la curva salarial es más pronunciada en los primeros 7-10 años de carrera y se aplana después. El salto del junior al mid suele ser del 40-60%. El salto del mid al senior puede ser del 30-50%. Más allá del senior individual contributor, el camino de mayor crecimiento salarial suele pasar por el management o la especialización profunda en áreas técnicas de alto valor.</p>
      <p>La experiencia en el extranjero — especialmente en mercados como UK, Alemania o Estados Unidos — tiende a tener un efecto positivo en el salario al volver a España, especialmente si el regreso se hace a una empresa que valora ese contexto internacional.</p>

      <h2>Cómo saber si tu salario está donde debe estar</h2>
      <p>Los datos agregados son útiles para contexto, pero lo que realmente importa es tu posición específica: tu rol exacto, tu ciudad, tus años de experiencia. Para obtener ese dato, usa nuestra <a href="/es/">calculadora gratuita</a> — te da el percentil de mercado para tu situación concreta en 30 segundos, sin registro.</p>
      <p>Si estás por debajo del percentil 40, tienes una conversación que tener. Si estás por debajo del percentil 25, la tienes que tener con urgencia.</p>
    `,
  },
];

export function getAllBlogPostsES(): BlogPostES[] {
  const now = new Date();
  return BLOG_POSTS_ES
    .filter((p) => {
      const postDate = new Date(p.date);
      postDate.setHours(23, 59, 59, 999);
      return postDate <= now;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlugES(slug: string): BlogPostES | null {
  const post = BLOG_POSTS_ES.find((p) => p.slug === slug) ?? null;
  if (!post) return null;
  const postDate = new Date(post.date);
  postDate.setHours(23, 59, 59, 999);
  if (postDate > new Date()) return null;
  return post;
}

export function getAllBlogSlugES(): { slug: string }[] {
  return getAllBlogPostsES().map((p) => ({ slug: p.slug }));
}
