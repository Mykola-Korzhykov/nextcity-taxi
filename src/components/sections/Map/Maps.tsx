import YandexMap from "./YandexMap";
import styles from "./Maps.module.scss";

const Maps: React.FC = () => {
  return (
    <div className={styles.wrapperMaps}>
      <div className={styles.mapContainer}>
        <YandexMap />
      </div>
    </div>
  );
};

export default Maps;

// import MapYandex from "./MapYandex";
// import styles from "./Maps.module.scss";

// const Maps = () => {
//   return (
//     <div className={styles.wrapperMaps}>
//       <MapYandex />
//     </div>
//   );
// };

// export default Maps;
