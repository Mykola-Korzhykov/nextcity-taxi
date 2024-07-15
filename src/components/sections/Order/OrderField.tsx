import { FC, ChangeEvent, useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import DGDIcon from "@img/ui/Field/dgd.svg";
import CreateIcon from "@img/ui/Field/create.svg";
import RemoveIcon from "@img/ui/Field/remove.svg";
import PlaceIcon from "@img/ui/Field/place.svg";
import Select from "@components/ui/Select/Select";

import { IFormValues, IOrderFields } from "interfaces/IField";
import styles from "./Order.module.scss";

// const OrderField: FC<IOrderFields> = ({ createField, removeField, index }) => {
//   const [showSelect, setShowSelect] = useState<boolean>(false);
//   const [suggestions, setSuggestions] = useState<any[]>([]); // Состояние для хранения подсказок
//   const selectRef = useRef<HTMLDivElement>(null);

//   const { control, register, getValues, setValue } =
//     useFormContext<IFormValues>();
//   const fields = getValues(`fields`);

//   const fetchSuggestions = async (query: string) => {
//     try {
//       const bbox = "19.7,41.2~180.0,82.0";
//       const response = await fetch(
//         `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=${bbox}&rspn=1`
//       );
//       const data = await response.json();

//       console.log("Полный ответ API:", data);

//       if (
//         data.response &&
//         data.response.GeoObjectCollection &&
//         data.response.GeoObjectCollection.featureMember
//       ) {
//         const suggestions = data.response.GeoObjectCollection.featureMember.map(
//           (member: any) => {
//             const geoObject = member.GeoObject;
//             const addressDetails =
//               geoObject.metaDataProperty.GeocoderMetaData.AddressDetails;
//             const country = addressDetails?.Country;
//             const administrativeArea = country?.AdministrativeArea;
//             const subAdministrativeArea =
//               administrativeArea?.SubAdministrativeArea;
//             const locality =
//               subAdministrativeArea?.Locality || administrativeArea?.Locality;
//             const thoroughfare = locality?.Thoroughfare;
//             const components = thoroughfare?.ThoroughfareName || geoObject.name;

//             return {
//               address: geoObject.name,
//               description: geoObject.description || "",
//               kind: geoObject.metaDataProperty.GeocoderMetaData.kind || "",
//               region: administrativeArea?.AdministrativeAreaName || "",
//               fullAddress: components,
//               coordinates: geoObject.Point.pos,
//             };
//           }
//         );

//         console.log("Все подсказки:", suggestions);

//         const localitySuggestions = suggestions.filter(
//           (suggestion: { kind: string; address: string }) => {
//             const isLocalityOrAdmin = ["locality", "administrative"].includes(
//               suggestion.kind
//             );
//             const startsWithQuery = new RegExp(`^${query}`, "i").test(
//               suggestion.address
//             );
//             return isLocalityOrAdmin && startsWithQuery;
//           }
//         );

//         const unwantedPatterns =
//           /Садоводческое|некоммерческое|товарищество|СНТ|садоводство|Гаражный|гаражное|кооператив|река|остров|улица/i;
//         const filteredSuggestions = localitySuggestions.filter(
//           (suggestion: { address: string }) =>
//             !unwantedPatterns.test(suggestion.address)
//         );

//         const otherSuggestions = suggestions.filter(
//           (suggestion: { address: string }) => {
//             const isNotUnwanted = !unwantedPatterns.test(suggestion.address);
//             const startsWithQuery = new RegExp(`^${query}`, "i").test(
//               suggestion.address
//             );
//             return isNotUnwanted && startsWithQuery;
//           }
//         );

//         const prioritizedSuggestions = [
//           ...filteredSuggestions,
//           ...otherSuggestions,
//         ];

//         const uniqueSuggestions: any = Array.from(
//           new Set(prioritizedSuggestions.map((s) => s.address))
//         ).map((address) => {
//           return prioritizedSuggestions.find((s) => s.address === address);
//         });

//         console.log("Фильтрованные подсказки:", uniqueSuggestions);
//         console.log(uniqueSuggestions.length);

//         return uniqueSuggestions;
//       } else {
//         console.log("Подсказки не найдены.");
//         return [];
//       }
//     } catch (error) {
//       console.error("Ошибка при получении подсказок:", error);
//       return [];
//     }
//   };

//   const autoSize = async (e: ChangeEvent<HTMLTextAreaElement>) => {
//     e.target.style.height = "21px";
//     const scrollHeight = e.target.scrollHeight;
//     e.target.style.height = `${scrollHeight}px`;

//     const query = e.target.value;

//     if (query.length > 2) {
//       const suggestions = await fetchSuggestions(query);
//       if (suggestions.length > 0) {
//         setSuggestions(suggestions);
//         setShowSelect(true);
//       } else {
//         setShowSelect(false);
//       }
//     } else {
//       setShowSelect(false);
//     }
//   };

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
//                 list={suggestions} // Передаем подсказки из состояния
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

// const OrderField: FC<IOrderFields> = ({ createField, removeField, index }) => {
//   const [showSelect, setShowSelect] = useState<boolean>(false);
//   const [suggestions, setSuggestions] = useState<any[]>([]); // Состояние для хранения подсказок
//   const selectRef = useRef<HTMLDivElement>(null);

//   const { control, register, getValues, setValue } =
//     useFormContext<IFormValues>();
//   const fields = getValues(`fields`);

//   const prioritizedRegions = [
//     "Воронежская область",
//     "Белгородская область",
//     "Липецкая область",
//     "Москва",
//     "Московская область",
//     "Тульская область",
//     "Рязанская область",
//     "Ярославская область",
//     "Калужская область",
//     "Тамбовская область",
//   ];

//   const fetchSuggestions = async (query: string) => {
//     try {
//       // const bbox = "19.7,41.2~180.0,82.0";
//       const bbox = "35.0,49.0~41.0,58.0";

//       const response = await fetch(
//         `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=${bbox}&rspn=1`
//       );
//       const data = await response.json();

//       console.log("Полный ответ API:", data);

//       if (
//         data.response &&
//         data.response.GeoObjectCollection &&
//         data.response.GeoObjectCollection.featureMember
//       ) {
//         const suggestions = data.response.GeoObjectCollection.featureMember.map(
//           (member: any) => {
//             const geoObject = member.GeoObject;
//             const addressDetails =
//               geoObject.metaDataProperty.GeocoderMetaData.AddressDetails;
//             const country = addressDetails?.Country;
//             const administrativeArea = country?.AdministrativeArea;
//             const subAdministrativeArea =
//               administrativeArea?.SubAdministrativeArea;
//             const locality =
//               subAdministrativeArea?.Locality || administrativeArea?.Locality;
//             const thoroughfare = locality?.Thoroughfare;
//             const components = thoroughfare?.ThoroughfareName || geoObject.name;

//             return {
//               address: geoObject.name,
//               description: geoObject.description || "",
//               kind: geoObject.metaDataProperty.GeocoderMetaData.kind || "",
//               region: administrativeArea?.AdministrativeAreaName || "",
//               fullAddress: components,
//               coordinates: geoObject.Point.pos,
//             };
//           }
//         );

//         console.log("Все подсказки:", suggestions);

//         const localitySuggestions = suggestions.filter(
//           (suggestion: { kind: string; address: string }) => {
//             const isLocalityOrAdmin = ["locality", "administrative"].includes(
//               suggestion.kind
//             );
//             const startsWithQuery = new RegExp(`^${query}`, "i").test(
//               suggestion.address
//             );
//             return isLocalityOrAdmin && startsWithQuery;
//           }
//         );

//         const unwantedPatterns =
//           /Садоводческое|некоммерческое|товарищество|СНТ|садоводство|Гаражный|гаражное|кооператив|река|остров|улица/i;
//         const filteredSuggestions = localitySuggestions.filter(
//           (suggestion: { address: string }) =>
//             !unwantedPatterns.test(suggestion.address)
//         );

//         const otherSuggestions = suggestions.filter(
//           (suggestion: { address: string }) => {
//             const isNotUnwanted = !unwantedPatterns.test(suggestion.address);
//             const startsWithQuery = new RegExp(`^${query}`, "i").test(
//               suggestion.address
//             );
//             return isNotUnwanted && startsWithQuery;
//           }
//         );

//         const prioritizedSuggestions = [
//           ...filteredSuggestions,
//           ...otherSuggestions,
//         ];

//         const uniqueSuggestions: any = Array.from(
//           new Set(prioritizedSuggestions.map((s) => s.address))
//         ).map((address) => {
//           return prioritizedSuggestions.find((s) => s.address === address);
//         });

//         const sortedSuggestions = uniqueSuggestions.sort((a: any, b: any) => {
//           const regionA = a.region || "";
//           const regionB = b.region || "";
//           const indexA = prioritizedRegions.indexOf(regionA);
//           const indexB = prioritizedRegions.indexOf(regionB);
//           if (indexA === -1 && indexB === -1) return 0;
//           if (indexA === -1) return 1;
//           if (indexB === -1) return -1;
//           return indexA - indexB;
//         });

//         console.log("Фильтрованные подсказки:", sortedSuggestions);
//         console.log(sortedSuggestions.length);

//         return sortedSuggestions;
//       } else {
//         console.log("Подсказки не найдены.");
//         return [];
//       }
//     } catch (error) {
//       console.error("Ошибка при получении подсказок:", error);
//       return [];
//     }
//   };

//   const autoSize = async (e: ChangeEvent<HTMLTextAreaElement>) => {
//     e.target.style.height = "21px";
//     const scrollHeight = e.target.scrollHeight;
//     e.target.style.height = `${scrollHeight}px`;

//     const query = e.target.value;

//     if (query.length > 2) {
//       const suggestions = await fetchSuggestions(query);
//       if (suggestions.length > 0) {
//         setSuggestions(suggestions);
//         setShowSelect(true);
//       } else {
//         setShowSelect(false);
//       }
//     } else {
//       setShowSelect(false);
//     }
//   };

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
//                 list={suggestions} // Передаем подсказки из состояния
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

const OrderField: FC<IOrderFields> = ({ createField, removeField, index }) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]); // Состояние для хранения подсказок
  const selectRef = useRef<HTMLDivElement>(null);

  const { control, register, getValues, setValue } =
    useFormContext<IFormValues>();
  const fields = getValues(`fields`);

  const prioritizedRegions = [
    "Воронежская область",
    "Белгородская область",
    "Липецкая область",
    "Москва",
    "Московская область",
    "Тульская область",
    "Рязанская область",
    "Ярославская область",
    "Калужская область",
    "Тамбовская область",
  ];

  const fetchSuggestions = async (query: string) => {
    try {
      const bbox = "35.0,49.0~41.0,58.0"; // Область охватывает все указанные регионы
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

        const unwantedPatterns =
          /Садоводческое|некоммерческое|товарищество|СНТ|садоводство|Гаражный|гаражное|кооператив|река|остров|улица/i;
        const filteredSuggestions = suggestions.filter(
          (suggestion: { address: string }) =>
            !unwantedPatterns.test(suggestion.address)
        );

        const prioritizedSuggestions = filteredSuggestions.filter(
          (suggestion: { address: string }) =>
            new RegExp(query, "i").test(suggestion.address)
        );

        const uniqueSuggestions: any = Array.from(
          new Set(
            prioritizedSuggestions.map((s: { address: any }) => s.address)
          )
        ).map((address) => {
          return prioritizedSuggestions.find(
            (s: { address: unknown }) => s.address === address
          );
        });

        const sortedSuggestions = uniqueSuggestions.sort((a: any, b: any) => {
          const regionA = a.region || "";
          const regionB = b.region || "";
          const indexA = prioritizedRegions.indexOf(regionA);
          const indexB = prioritizedRegions.indexOf(regionB);
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });

        console.log("Фильтрованные подсказки:", sortedSuggestions);
        console.log(sortedSuggestions.length);

        return sortedSuggestions;
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
