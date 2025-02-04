import Footer from "../../components/Footer";

const TermsAndConditions = () => {

  const containerStyles = "max-w-[98%] my-[10px] mx-auto p-6 bg-gray-50 rounded-md shadow-md";
  const headerStyles = "text-3xl font-bold text-gray-500 mb-4 text-center p-4";
  const sectionTitleStyles = "text-xl font-semibold text-sky-500 mt-6 mb-2 pl-5 py-2 rounded";
  //const sectionTitleStyles = "bg-gradient-to-r from-sky-500 to-transparent text-xl font-semibold text-gray-100 mt-6 mb-2 pl-5 py-2 rounded";
  const paragraphStyles = "pl-5 text-lg text-gray-600 leading-relaxed mb-4";
  const listStyles = "pl-5 text-lg list-disc list-inside text-gray-600 leading-relaxed mb-4";
  //const footerStyles = "text-sm text-gray-500 mt-8 text-center";

  return (
    <div>
      <div className={containerStyles}>
      <h1 className={headerStyles}>Términos y Condiciones de Uso</h1>

      <div>
        <section>
          <h2 className={sectionTitleStyles}>1. Introducción</h2>
          <p className={paragraphStyles}>
            Bienvenido(a) a ClassKit, tu aplicación de gestión de inventario para instituciones educativas. Al utilizar esta aplicación, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, le recomendamos no utilizar la aplicación.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>2. Uso de la Aplicación</h2>
          <p className={paragraphStyles}>
            La aplicación está destinada exclusivamente para el registro, gestión y control de los elementos del inventario pertenecientes a las instituciones educativas.
          </p>
          <p className={paragraphStyles}>
            El usuario deberá proporcionar información verídica y precisa al registrar datos relacionados con el uso de los elementos del inventario.
          </p>
          <p className={paragraphStyles}>
            El acceso a la aplicación se limita al personal autorizado por la institución educativa correspondiente.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>3. Responsabilidad del Usuario</h2>
          <ul className={listStyles}>
            <li>El usuario se compromete a devolver los bienes del inventario en las mismas condiciones en las que fueron recibidos y en la fecha establecida.</li>
            <li>Cualquier daño, pérdida o uso indebido de los bienes deberá ser notificado inmediatamente a los administradores de la aplicación o al personal responsable de la institución.</li>
            <li>El usuario es responsable de garantizar que las credenciales de acceso a la aplicación sean confidenciales y no se compartan con terceros.</li>
          </ul>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>4. Propiedad de los Bienes</h2>
          <p className={paragraphStyles}>
            Todos los bienes registrados en la aplicación son propiedad de la institución educativa correspondiente.
          </p>
          <p className={paragraphStyles}>
            La institución se reserva el derecho de asignar, restringir o recuperar cualquier bien en cualquier momento.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>5. Restricciones de Uso</h2>
          <ul className={listStyles}>
            <li>Utilizar la aplicación para fines distintos a la gestión del inventario.</li>
            <li>Manipular, modificar o eliminar registros de bienes sin la debida autorización.</li>
            <li>Compartir información confidencial o sensible relacionada con el inventario con terceros no autorizados.</li>
          </ul>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>6. Privacidad de los Datos</h2>
          <p className={paragraphStyles}>
            La aplicación recopila y almacena datos necesarios para el funcionamiento del sistema, como el nombre de los usuarios, bienes asignados y fechas de uso.
          </p>
          <p className={paragraphStyles}>
            Nos comprometemos a proteger la privacidad de los datos almacenados y utilizarlos únicamente para los fines establecidos.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>7. Limitación de Responsabilidad</h2>
          <p className={paragraphStyles}>
            La institución educativa no se hace responsable de cualquier mal uso de los bienes del inventario o de la aplicación por parte de los usuarios.
          </p>
          <p className={paragraphStyles}>
            No garantizamos la disponibilidad ininterrumpida de la aplicación, aunque nos esforzamos por garantizar su correcto funcionamiento.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>8. Modificaciones a los Términos</h2>
          <p className={paragraphStyles}>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será notificado oportunamente a través de la aplicación.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleStyles}>9. Contacto</h2>
          <p className={paragraphStyles}>
            Si tiene alguna pregunta sobre estos términos y condiciones, puede comunicarse con el administrador de la aplicación o con el personal designado por la institución.
          </p>
        </section>
      </div>
      {/* <footer className={footerStyles}>
        © {new Date().getFullYear()} ClassKit. Todos los derechos reservados.
      </footer> */}
    </div>
      <Footer />
    </div>
  );
};

export { TermsAndConditions };
