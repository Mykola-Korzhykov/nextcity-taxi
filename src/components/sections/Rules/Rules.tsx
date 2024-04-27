import styles from "./Rules.module.scss";

const Rules = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ INTERCITY</h1>
        <h2 className={styles.description}>
          Данный документ представляет собой Пользовательское соглашение (далее
          – "Соглашение") между вами (далее – "Пользователь") и [Название
          компании] (далее – "Компания"), регулирующее использование сервиса
          междугороднего такси (далее – "Сервис"). Прошу вас внимательно
          ознакомиться с условиями настоящего Соглашения перед использованием
          Сервиса.
        </h2>
        <ul>
          <li>
            <p className={styles.text}>1. ОПРЕДЕЛЕНИЕ УСЛУГ</p>
            <p className={styles.text}>
              1.1 Сервис предоставляет услуги междугороднего такси, обеспечивая
              Пользователям доступ к транспортным средствам и водителям для
              перевозки между городами.
            </p>
          </li>
          <li>
            <p>2. ОПЛАТА И ВОЗНАГРАЖДЕНИЕ</p>
            <p>
              2.1 Оплата за услуги междугороднего такси производится в
              соответствии с тарифами, предоставленными Компанией.
            </p>
            <p>
              2.2 Компания вправе вносить изменения в тарифы без
              предварительного уведомления Пользователей.
            </p>
          </li>
          <li>
            <p>3. ОТМЕНА И ЗАКЛЮЧЕНИЕ СДЕЛКИ</p>
            <p>
              3.1. Пользователь вправе отменить заказ в соответствии с
              правилами, установленными Компанией.
            </p>
            <p>
              3.2. Компания вправе отказать в предоставлении услуги без
              объяснения причин.
            </p>
          </li>
          <li>
            <p>4. ОБЯЗАТЕЛЬСТВА И ОТВЕТСТВЕННОСТЬ СТОРОН</p>
            <p>
              4.1. Пользователь обязуется использовать Сервис с соблюдением всех
              применимых законов и правил.
            </p>
            <p>
              4.2. Компания несет ответственность за качество предоставляемых
              услуг, а также за сохранность личной информации Пользователя.
            </p>
          </li>
          <li>
            <p>5. КОНФИДЕНЦИАЛЬНОСТЬ</p>
            <p>
              5.1. Компания обязуется соблюдать конфиденциальность данных
              Пользователя в соответствии с положениями Политики
              конфиденциальности.
            </p>
          </li>
          <li>
            <p>6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</p>
            <p>
              6.1. Настоящее Соглашение может быть изменено Компанией без
              предварительного уведомления Пользователей.
            </p>
            <p>
              6.2. В случае возникновения споров, стороны обязуются разрешать их
              путем переговоров.
            </p>
          </li>
        </ul>
        <p>
          Пользуясь Сервисом, Пользователь выражает свое согласие с условиями
          настоящего Соглашения. Если вы не согласны с этими условиями,
          прекратите использование Сервиса.
        </p>
      </div>
    </section>
  );
};

export default Rules;
