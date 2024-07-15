import { FC, ChangeEvent, useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import DGDIcon from "@img/ui/Field/dgd.svg";
import CreateIcon from "@img/ui/Field/create.svg";
import RemoveIcon from "@img/ui/Field/remove.svg";
import PlaceIcon from "@img/ui/Field/place.svg";
import Select from "@components/ui/Select/Select";
import useClickOutside from "@hooks/useClickOutside";

import { IFormValues, IOrderFields } from "interfaces/IField";
import styles from "./Order.module.scss";

const OrderField: FC<IOrderFields> = ({ createField, removeField, index }) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]); // Состояние для хранения подсказок
  const selectRef = useRef<HTMLDivElement>(null);

  const { control, register, getValues, setValue } =
    useFormContext<IFormValues>();
  const fields = getValues(`fields`);

  //Функция для получения подсказок из API Яндекс
  // const fetchSuggestions = async (query: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=36.4,50.2~40.2,55.8&rspn=1`
  //     );
  //     const data = await response.json();
  //     const suggestions = data.response.GeoObjectCollection.featureMember.map(
  //       (member: any) => {
  //         const geoObject = member.GeoObject;
  //         return {
  //           address: geoObject.name, // Учитываем только название (адрес)
  //           description: geoObject.description || "",
  //         };
  //       }
  //     );
  //     setSuggestions(suggestions);
  //     console.log(suggestions);
  //   } catch (error) {
  //     console.error("Ошибка при получении подсказок:", error);
  //   }
  // };

  // const centralRegions = [
  //   "Воронежская область",
  //   "Москва",
  //   "Московская область",
  //   "Тульская область",
  //   "Рязанская область",
  //   "Ярославская область",

  //   "Калужская область",
  //   "Липецкая область",
  //   "Тамбовская область",
  //   "Белгородская область",
  // ];

  // const fetchSuggestions = async (query: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=36.4,50.2~40.2,55.8&rspn=1`
  //     );
  //     const data = await response.json();

  //     // Получаем все подсказки
  //     const suggestions = data.response.GeoObjectCollection.featureMember.map(
  //       (member: any) => {
  //         const geoObject = member.GeoObject;
  //         return {
  //           address: geoObject.name,
  //           description: geoObject.description || "",
  //           kind: geoObject.metaDataProperty.GeocoderMetaData.kind || "",
  //           region:
  //             geoObject.metaDataProperty.GeocoderMetaData.AddressDetails
  //               ?.Country?.AdministrativeArea?.AdministrativeAreaName || "",
  //         };
  //       }
  //     );

  //     // Фильтруем города центральной части России
  //     const centralCitySuggestions = suggestions.filter(
  //       (suggestion: {
  //         kind: string;
  //         region: string | string[];
  //         address: string;
  //       }) => {
  //         const isCity = suggestion.kind === "locality";
  //         const isInCentralRegion = centralRegions.some((region) =>
  //           suggestion.region.includes(region)
  //         );
  //         const startsWithQuery = new RegExp(`^${query}`, "i").test(
  //           suggestion.address
  //         );
  //         return isCity && isInCentralRegion && startsWithQuery;
  //       }
  //     );

  //     // Фильтруем остальные города
  //     const otherCitySuggestions = suggestions.filter(
  //       (suggestion: {
  //         kind: string;
  //         address: string;
  //         region: string | string[];
  //       }) => {
  //         const isCity = suggestion.kind === "locality";
  //         const startsWithQuery = new RegExp(`^${query}`, "i").test(
  //           suggestion.address
  //         );
  //         const isNotCentralCity = !centralRegions.some((region) =>
  //           suggestion.region.includes(region)
  //         );
  //         return isCity && isNotCentralCity && startsWithQuery;
  //       }
  //     );

  //     // Фильтруем остальные объекты
  //     const otherSuggestions = suggestions.filter(
  //       (suggestion: { kind: string; address: string }) => {
  //         const isNotCity = suggestion.kind !== "locality";
  //         const startsWithQuery = new RegExp(`^${query}`, "i").test(
  //           suggestion.address
  //         );
  //         // Исключаем нежелательные объекты
  //         const isUnwanted =
  //           /Садоводческое|некоммерческое|товарищество|СНТ/i.test(
  //             suggestion.address
  //           );
  //         return isNotCity && startsWithQuery && !isUnwanted;
  //       }
  //     );

  //     // Приоритетный порядок: сначала города центральной части России, затем остальные города, затем остальные объекты
  //     const prioritizedSuggestions = [
  //       ...centralCitySuggestions,
  //       ...otherCitySuggestions,
  //       ...otherSuggestions,
  //     ];

  //     setSuggestions(prioritizedSuggestions);
  //     console.log(prioritizedSuggestions);
  //   } catch (error) {
  //     console.error("Ошибка при получении подсказок:", error);
  //   }
  // };
  // const fetchSuggestions = async (query: string) => {
  //   try {
  //     // Задаем координаты, охватывающие всю Россию
  //     const bbox = "19.7,41.2~180.0,82.0"; // Охватывает территорию всей России
  //     const response = await fetch(
  //       `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=${bbox}&rspn=1`
  //     );
  //     const data = await response.json();

  //     // Выводим полный ответ API для отладки
  //     console.log("Полный ответ API:", data);

  //     if (
  //       data.response &&
  //       data.response.GeoObjectCollection &&
  //       data.response.GeoObjectCollection.featureMember
  //     ) {
  //       // Получаем все подсказки
  //       const suggestions = data.response.GeoObjectCollection.featureMember.map(
  //         (member: any) => {
  //           const geoObject = member.GeoObject;

  //           // Обработка и проверка вложенных данных
  //           const addressDetails =
  //             geoObject.metaDataProperty.GeocoderMetaData.AddressDetails;
  //           const country = addressDetails?.Country;
  //           const administrativeArea = country?.AdministrativeArea;
  //           const subAdministrativeArea =
  //             administrativeArea?.SubAdministrativeArea;
  //           const locality =
  //             subAdministrativeArea?.Locality || administrativeArea?.Locality;
  //           const thoroughfare = locality?.Thoroughfare;

  //           // Формируем компоненты адреса
  //           const components = thoroughfare?.ThoroughfareName || geoObject.name;

  //           return {
  //             address: geoObject.name,
  //             description: geoObject.description || "",
  //             kind: geoObject.metaDataProperty.GeocoderMetaData.kind || "",
  //             region: administrativeArea?.AdministrativeAreaName || "",
  //             fullAddress: components,
  //             coordinates: geoObject.Point.pos,
  //           };
  //         }
  //       );

  //       // Выводим все подсказки для отладки
  //       console.log("Все подсказки:", suggestions);

  //       // Фильтруем города и населенные пункты
  //       const localitySuggestions = suggestions.filter(
  //         (suggestion: { kind: string; address: string }) => {
  //           const isLocalityOrAdmin = ["locality", "administrative"].includes(
  //             suggestion.kind
  //           );
  //           const startsWithQuery = new RegExp(`^${query}`, "i").test(
  //             suggestion.address
  //           );
  //           return isLocalityOrAdmin && startsWithQuery;
  //         }
  //       );

  //       // Дополнительная фильтрация для удаления нежелательных объектов
  //       const unwantedPatterns =
  //         /Садоводческое|некоммерческое|товарищество|СНТ|садоводство|Гаражный|гаражное|кооператив|река|остров|улица/i;
  //       const filteredSuggestions = localitySuggestions.filter(
  //         (suggestion: { address: string }) =>
  //           !unwantedPatterns.test(suggestion.address)
  //       );

  //       // Если нет релевантных населенных пунктов, включаем другие объекты
  //       const otherSuggestions = suggestions.filter(
  //         (suggestion: { address: string }) => {
  //           const isNotUnwanted = !unwantedPatterns.test(suggestion.address);
  //           const startsWithQuery = new RegExp(`^${query}`, "i").test(
  //             suggestion.address
  //           );
  //           return isNotUnwanted && startsWithQuery;
  //         }
  //       );

  //       // Объединяем результаты, сначала населенные пункты, затем остальные объекты
  //       const prioritizedSuggestions = [
  //         ...filteredSuggestions,
  //         ...otherSuggestions,
  //       ];

  //       // Убираем дубликаты из списка предложений
  //       const uniqueSuggestions: any = Array.from(
  //         new Set(prioritizedSuggestions.map((s) => s.address))
  //       ).map((address) => {
  //         return prioritizedSuggestions.find((s) => s.address === address);
  //       });

  //       // Выводим отфильтрованные результаты для отладки
  //       console.log("Фильтрованные подсказки:", uniqueSuggestions);
  //       console.log(uniqueSuggestions.length);

  //       // Устанавливаем отфильтрованные результаты в состояние
  //       setSuggestions(uniqueSuggestions);
  //     } else {
  //       // Если нет результатов, устанавливаем пустой массив
  //       setSuggestions([]);
  //       console.log("Подсказки не найдены.");
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при получении подсказок:", error);
  //   }
  // };

  // const autoSize = async (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   e.target.style.height = "21px";
  //   const scrollHeight = e.target.scrollHeight;
  //   e.target.style.height = `${scrollHeight}px`;

  //   const query = e.target.value;

  //   await fetchSuggestions(query);
  //   // Проверка длины фильтрованных подсказок
  //   if (query.length > 2 && suggestions.length > 0) {
  //     setShowSelect(true);
  //   } else {
  //     setShowSelect(false);
  //   }
  // };

  // const autoSize = async (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   e.target.style.height = "21px";
  //   const scrollHeight = e.target.scrollHeight;
  //   e.target.style.height = `${scrollHeight}px`;

  //   const query = e.target.value;

  //   if (query.length > 2) {
  //     const suggestions = await fetchSuggestions(query);
  //     console.log("Fetched suggestions:", suggestions);
  //     // await fetchSuggestions(query);
  //     // console.log(fetchSuggestions);
  //     setShowSelect(true);
  //   } else {
  //     setShowSelect(false);
  //   }
  // };

  // useClickOutside(selectRef, showSelect, () => {
  //   setShowSelect(false);
  //   setValue(`fields.${index}.route`, "");
  // });

  const fetchSuggestions = async (query: string) => {
    try {
      const bbox = "19.7,41.2~180.0,82.0";
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=${bbox}&rspn=1`
      );
      const data = await response.json();

      console.log("Полный ответ API:", data);

      if (
        data.response &&
        data.response.GeoObjectCollection &&
        data.response.GeoObjectCollection.featureMember
      ) {
        const suggestions = data.response.GeoObjectCollection.featureMember.map(
          (member: any) => {
            const geoObject = member.GeoObject;
            const addressDetails =
              geoObject.metaDataProperty.GeocoderMetaData.AddressDetails;
            const country = addressDetails?.Country;
            const administrativeArea = country?.AdministrativeArea;
            const subAdministrativeArea =
              administrativeArea?.SubAdministrativeArea;
            const locality =
              subAdministrativeArea?.Locality || administrativeArea?.Locality;
            const thoroughfare = locality?.Thoroughfare;
            const components = thoroughfare?.ThoroughfareName || geoObject.name;

            return {
              address: geoObject.name,
              description: geoObject.description || "",
              kind: geoObject.metaDataProperty.GeocoderMetaData.kind || "",
              region: administrativeArea?.AdministrativeAreaName || "",
              fullAddress: components,
              coordinates: geoObject.Point.pos,
            };
          }
        );

        console.log("Все подсказки:", suggestions);

        const localitySuggestions = suggestions.filter(
          (suggestion: { kind: string; address: string }) => {
            const isLocalityOrAdmin = ["locality", "administrative"].includes(
              suggestion.kind
            );
            const startsWithQuery = new RegExp(`^${query}`, "i").test(
              suggestion.address
            );
            return isLocalityOrAdmin && startsWithQuery;
          }
        );

        const unwantedPatterns =
          /Садоводческое|некоммерческое|товарищество|СНТ|садоводство|Гаражный|гаражное|кооператив|река|остров|улица/i;
        const filteredSuggestions = localitySuggestions.filter(
          (suggestion: { address: string }) =>
            !unwantedPatterns.test(suggestion.address)
        );

        const otherSuggestions = suggestions.filter(
          (suggestion: { address: string }) => {
            const isNotUnwanted = !unwantedPatterns.test(suggestion.address);
            const startsWithQuery = new RegExp(`^${query}`, "i").test(
              suggestion.address
            );
            return isNotUnwanted && startsWithQuery;
          }
        );

        const prioritizedSuggestions = [
          ...filteredSuggestions,
          ...otherSuggestions,
        ];

        const uniqueSuggestions: any = Array.from(
          new Set(prioritizedSuggestions.map((s) => s.address))
        ).map((address) => {
          return prioritizedSuggestions.find((s) => s.address === address);
        });

        console.log("Фильтрованные подсказки:", uniqueSuggestions);
        console.log(uniqueSuggestions.length);

        return uniqueSuggestions;
      } else {
        console.log("Подсказки не найдены.");
        return [];
      }
    } catch (error) {
      console.error("Ошибка при получении подсказок:", error);
      return [];
    }
  };

  const autoSize = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "21px";
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;

    const query = e.target.value;

    if (query.length > 2) {
      const suggestions = await fetchSuggestions(query);
      if (suggestions.length > 0) {
        setSuggestions(suggestions);
        setShowSelect(true);
      } else {
        setShowSelect(false);
      }
    } else {
      setShowSelect(false);
    }
  };

  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.dragButton}>
        <DGDIcon />
      </div>
      <div className={styles.fullField}>
        <div
          className={`${styles.field} ${showSelect ? styles.fieldActive : ""}`}
        >
          <textarea
            placeholder={
              index === 0
                ? "Откуда"
                : index === fields.length - 1
                ? "Куда"
                : "Адрес"
            }
            className={styles.routeInput}
            onInput={autoSize}
            data-isfield="true"
            {...register(`fields.${index}.route`)}
          />
          <div>
            <input
              type="number"
              placeholder={"Подъезд"}
              className={styles.entranceInput}
              {...register(`fields.${index}.entrance`)}
            />
          </div>
          <div
            className={`${styles.createButton} ${
              index === 0 ? styles.show : styles.hide
            }`}
            onClick={() => createField(index)}
          >
            <CreateIcon />
          </div>
          <div
            className={`${styles.removeButton} ${
              index > 0 && index !== fields.length - 1 && fields.length > 2
                ? styles.show
                : styles.hide
            }`}
            onClick={() => removeField(index)}
          >
            <RemoveIcon />
          </div>
          <div
            className={`${styles.placeButton} ${
              index === fields.length - 1 ? styles.show : styles.hide
            }`}
          >
            <PlaceIcon />
          </div>
        </div>
      </div>
      {showSelect && (
        <div ref={selectRef}>
          <Controller
            name={`fields.${index}.select`}
            control={control}
            render={({ field }) => (
              <Select
                list={suggestions} // Передаем подсказки из состояния
                customClass="custom-class"
                onChange={(address) => {
                  field.onChange(address);
                  setValue(`fields.${index}.route`, address);
                  setShowSelect(false);
                }}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default OrderField;

// import { FC, ChangeEvent, useState, useRef } from "react";
// import { useFormContext, Controller } from "react-hook-form";

// import DGDIcon from "@img/ui/Field/dgd.svg";
// import CreateIcon from "@img/ui/Field/create.svg";
// import RemoveIcon from "@img/ui/Field/remove.svg";
// import PlaceIcon from "@img/ui/Field/place.svg";
// import Select from "@components/ui/Select/Select";
// import useClickOutside from "@hooks/useClickOutside";

// import { IFormValues, IOrderFields } from "interfaces/IField";
// import styles from "./Order.module.scss";

// const selectData = [
//   { address: "Донована 13" },
//   { address: "Ленина 1" },
//   { address: "Джорджа Вашингтона 14" },
//   { address: "Пролетарская 25" },
// ];

// const OrderField: FC<IOrderFields> = ({ createField, removeField, index }) => {
//   const [showSelect, setShowSelect] = useState<boolean>(false);
//   const selectRef = useRef<HTMLDivElement>(null);

//   const { control, register, getValues, setValue } =
//     useFormContext<IFormValues>();
//   const fields = getValues(`fields`);

//   const autoSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     e.target.style.height = "21px";
//     const scrollHeight = e.target.scrollHeight;
//     e.target.style.height = `${scrollHeight}px`;

//     if (e.target.value.length > 3) {
//       setShowSelect(true);
//     } else {
//       setShowSelect(false);
//     }
//   };

//   useClickOutside(selectRef, showSelect, () => {
//     setShowSelect(false);
//     setValue(`fields.${index}.route`, "");
//   });

//   return (
//     <div className={styles.fieldWrapper}>
//       <div className={styles.dragButton}>
//         <DGDIcon />
//       </div>
//       <div className={styles.fullField}>
//         <div
//           className={`${styles.field} ${showSelect ? styles.fieldActive : ""}`}
//         >
//           <textarea
//             placeholder={
//               index === 0
//                 ? "Откуда"
//                 : index === fields.length - 1
//                 ? "Куда"
//                 : "Адрес"
//             }
//             className={styles.routeInput}
//             onInput={autoSize}
//             data-isfield="true"
//             {...register(`fields.${index}.route`)}
//           />
//           <div>
//             <input
//               type="number"
//               placeholder={"Подъезд"}
//               className={styles.entranceInput}
//               {...register(`fields.${index}.entrance`)}
//             />
//           </div>
//           <div
//             className={`${styles.createButton} ${
//               index === 0 ? styles.show : styles.hide
//             }`}
//             onClick={() => createField(index)}
//           >
//             <CreateIcon />
//           </div>
//           <div
//             className={`${styles.removeButton} ${
//               index > 0 && index !== fields.length - 1 && fields.length > 2
//                 ? styles.show
//                 : styles.hide
//             }`}
//             onClick={() => removeField(index)}
//           >
//             <RemoveIcon />
//           </div>
//           <div
//             className={`${styles.placeButton} ${
//               index === fields.length - 1 ? styles.show : styles.hide
//             }`}
//           >
//             <PlaceIcon />
//           </div>
//         </div>
//       </div>
//       {showSelect && (
//         <div ref={selectRef}>
//           <Controller
//             name={`fields.${index}.select`}
//             control={control}
//             render={({ field }) => (
//               <Select
//                 list={selectData}
//                 customClass="custom-class"
//                 onChange={(address) => {
//                   field.onChange(address);
//                   setValue(`fields.${index}.route`, address);
//                   setShowSelect(false);
//                 }}
//               />
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderField;
