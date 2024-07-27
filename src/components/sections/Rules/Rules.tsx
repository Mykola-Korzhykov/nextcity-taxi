import styles from "./Rules.module.scss";

const Rules = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ NEXTCITY</h1>
        <br />
        <h2 className={styles.description}>
          Данный документ представляет собой Пользовательское соглашение (далее
          – "Соглашение") между вами (далее – "Пользователь") и Next City (далее
          – "Компания"), регулирующее использование сервиса междугороднего такси
          (далее – "Сервис"). <br />
          <br />
          Прошу вас внимательно ознакомиться с условиями настоящего Соглашения
          перед использованием Сервиса.
        </h2>
        <br />
        <ul>
          <li>
            <p className={styles.textTitle}>
              <b>1. ОПРЕДЕЛЕНИЕ УСЛУГ</b>
            </p>
            <br />
            <p className={styles.text}>
              1.1 <b>Сервис</b> предоставляет услуги междугороднего такси,
              обеспечивая Пользователям доступ к транспортным средствам и
              водителям для перевозки между городами.
            </p>
          </li>
          <br />
          <li>
            <p className={styles.textTitle}>
              <b>2. ОПЛАТА И ВОЗНАГРАЖДЕНИЕ</b>
            </p>
            <br />
            <p className={styles.text}>
              2.1 Оплата за услуги междугороднего такси производится в
              соответствии с тарифами, предоставленными <b>Компанией</b>.
            </p>
            <br />
            <p className={styles.text}>
              2.2 <b>Компания</b> вправе вносить изменения в тарифы без
              предварительного уведомления <b>Пользователей</b>.
            </p>
          </li>
          <br />
          <li>
            <p className={styles.textTitle}>
              <b>3. ОТМЕНА И ЗАКЛЮЧЕНИЕ СДЕЛКИ</b>
            </p>
            <br />
            <p className={styles.text}>
              3.1. <b>Пользователь</b> вправе отменить заказ в соответствии с
              правилами, установленными <b>Компанией</b>.
            </p>
            <br />
            <p className={styles.text}>
              3.2. <b>Компания</b> вправе отказать в предоставлении услуги без
              объяснения причин.
            </p>
          </li>
          <br />
          <li>
            <p className={styles.textTitle}>
              <b>4. ОБЯЗАТЕЛЬСТВА И ОТВЕТСТВЕННОСТЬ СТОРОН</b>
            </p>
            <br />
            <p className={styles.text}>
              4.1. <b>Пользователь</b> обязуется использовать <b>Сервис</b> с
              соблюдением всех применимых законов и правил.
            </p>
            <br />
            <p className={styles.text}>
              4.2. <b>Компания</b> несет ответственность за качество
              предоставляемых услуг, а также за сохранность личной информации{" "}
              <b>Пользователя.</b>
            </p>
          </li>
          <br />
          <li>
            <p className={styles.textTitle}>
              <b>5. КОНФИДЕНЦИАЛЬНОСТЬ</b>
            </p>
            <br />
            <p className={styles.text}>
              5.1. <b>Компания</b> обязуется соблюдать конфиденциальность данных{" "}
              <b>Пользователя</b> в соответствии с положениями{" "}
              <b>Политики конфиденциальности.</b>
            </p>
          </li>
          <br />
          <li>
            <p className={styles.textTitle}>
              <b>6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</b>
            </p>
            <br />
            <p className={styles.text}>
              6.1. Настоящее <b>Соглашение</b> может быть изменено{" "}
              <b>Компанией</b> без предварительного уведомления{" "}
              <b>Пользователей.</b>
            </p>
            <br />
            <p className={styles.text}>
              6.2. В случае возникновения споров, стороны обязуются разрешать их
              путем переговоров.
            </p>
          </li>
          <br />
        </ul>
        <p className={styles.end}>
          Пользуясь <b>Сервисом, Пользователь</b> выражает свое согласие с
          условиями настоящего <b>Соглашения</b>. Если вы не согласны с этими
          условиями, прекратите использование <b>Сервиса</b>.
        </p>
      </div>
    </section>
  );
};

export default Rules;
