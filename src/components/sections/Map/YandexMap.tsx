import { FC, useEffect, useState } from "react";

const YandexMap: FC = () => {
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    // Создаем новый элемент script для загрузки Яндекс API
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&lang=ru_RU";
    script.async = true; // Загрузка скрипта будет асинхронной

    // Обработчик загрузки скрипта
    script.onload = () => {
      const ymaps = (window as any).ymaps;
      if (ymaps) {
        ymaps.ready(() => {
          // Создание карты с центром в г. Россошь, Воронежская область
          const map = new ymaps.Map("map", {
            center: [50.198224, 39.568724], // Координаты Россошь, Воронежская область
            zoom: 7, // Уровень зума
            controls: [], // Отключаем все стандартные контролы
            type: "yandex#map",
          });

          // Добавление маркера на карту
          const placemark = new ymaps.Placemark([50.198224, 39.568724], {
            balloonContent: "Россошь, Воронежская область",
          });
          map.geoObjects.add(placemark); // Добавляем маркер на карту

          // Добавляем нужные контролы
          map.controls.add("zoomControl"); // Контроль зума

          // Убираем панель инструментов, которая содержит "Создать свою карту"
          map.controls.remove("typeSelector");

          // Сохраняем экземпляр карты в состоянии
          setMapInstance(map);
        });
      }
    };

    // Добавление скрипта в документ
    document.body.appendChild(script);

    // Очистка при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        width: "800px",
        height: "400px",
        borderRadius: "30px",
        overflow: "hidden",
        marginTop: "20px",
      }}
      data-aos="fade-left"
    >
      <div id="map" style={{ width: "800px", height: "100%" }} />
    </div>
  );
};

export default YandexMap;

// import { FC, useEffect, useState, ChangeEvent } from "react";

// interface Suggestion {
//   name: string;
//   description: string;
//   coordinates: number[];
//   localityName: string;
//   regionName: string;
// }

// const YandexMap: FC = () => {
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [mapInstance, setMapInstance] = useState<any>(null);

//   useEffect(() => {
//     // Создаем новый элемент script для загрузки Яндекс API
//     const script = document.createElement("script");
//     script.src =
//       "https://api-maps.yandex.ru/2.1/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&lang=ru_RU";
//     script.async = true; // Загрузка скрипта будет асинхронной

//     // Обработчик загрузки скрипта
//     script.onload = () => {
//       const ymaps = (window as any).ymaps;
//       if (ymaps) {
//         ymaps.ready(() => {
//           // Создание карты с центром в г. Россошь, Воронежская область
//           const map = new ymaps.Map("map", {
//             center: [50.198224, 39.568724], // Координаты Россошь, Воронежская область
//             zoom: 7, // Уровень зума
//             controls: [], // Отключаем все стандартные контролы
//             type: "yandex#map",
//           });

//           // Добавление маркера на карту
//           const placemark = new ymaps.Placemark([50.198224, 39.568724], {
//             balloonContent: "Россошь, Воронежская область",
//           });
//           map.geoObjects.add(placemark); // Добавляем маркер на карту

//           // Добавляем нужные контролы
//           map.controls.add("zoomControl"); // Контроль зума

//           // Убираем панель инструментов, которая содержит "Создать свою карту"
//           map.controls.remove("typeSelector");

//           // Сохраняем экземпляр карты в состоянии
//           setMapInstance(map);
//         });
//       }
//     };

//     // Добавление скрипта в документ
//     document.body.appendChild(script);

//     // Очистка при размонтировании компонента
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Функция для запроса подсказок из Geocoder API Яндекс
//   const fetchSuggestions = async (query: string) => {
//     // Координаты Россоши, Воронежская область
//     const rossoshCoordinates = "39.568724,50.198224"; // Долгота, широта

//     // Определение bounding box для центральной части России
//     const centralRussiaBBox = "36.4,50.2~40.2,55.8"; // Пример: координаты углов центральной части России

//     const response = await fetch(
//       `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=${centralRussiaBBox}&ll=${rossoshCoordinates}&spn=0.552069,0.400552&rspn=1`
//     );
//     const data = await response.json();
//     const suggestions = data.response.GeoObjectCollection.featureMember.map(
//       (member: any) => {
//         const geoObject = member.GeoObject;
//         const metaData = geoObject.metaDataProperty.GeocoderMetaData;
//         const addressDetails = metaData.AddressDetails;
//         const country = addressDetails.Country;
//         const administrativeArea = country.AdministrativeArea;
//         const locality = administrativeArea?.Locality;
//         const subAdministrativeArea = administrativeArea?.SubAdministrativeArea;

//         // Название региона и типа населенного пункта
//         const localityName = locality?.LocalityName || "";
//         const subLocalityName =
//           subAdministrativeArea?.SubAdministrativeAreaName || "";
//         const regionName = administrativeArea?.AdministrativeAreaName || "";
//         const description = geoObject.description || "";

//         return {
//           name: geoObject.name,
//           description: description,
//           coordinates: geoObject.Point.pos.split(" ").reverse().map(Number),
//           localityName: localityName || subLocalityName, // Название города или суб-административной области
//           regionName: regionName,
//         };
//       }
//     );

//     // Приоритетное предложение по Воронежской области и крупным городам
//     const prioritizedSuggestions = suggestions
//       .sort((a: Suggestion, b: Suggestion) => {
//         const isVoronezhRegionA = a.regionName.includes("Воронежская область");
//         const isVoronezhRegionB = b.regionName.includes("Воронежская область");

//         // Проверяем принадлежность к Воронежской области
//         if (isVoronezhRegionA && !isVoronezhRegionB) return -1;
//         if (!isVoronezhRegionA && isVoronezhRegionB) return 1;

//         // Приоритет по длине названия (короче - выше)
//         return a.name.length - b.name.length;
//       })
//       .slice(0, 6); // Оставляем только первые 6 подсказок

//     return prioritizedSuggestions;
//   };

//   // Функция для обработки изменений в поле ввода
//   const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setInputValue(value);

//     if (value.length > 3) {
//       try {
//         const results = await fetchSuggestions(value);
//         setSuggestions(results);
//       } catch (error) {
//         console.error("Ошибка при получении подсказок:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Функция для обработки выбора подсказки
//   const handleSuggestionClick = (suggestion: Suggestion) => {
//     setInputValue(suggestion.name);
//     setSuggestions([]);

//     // Центрируем карту на выбранное место и добавляем маркер
//     const ymaps = (window as any).ymaps;
//     if (ymaps && mapInstance) {
//       mapInstance.setCenter(suggestion.coordinates, 14); // Устанавливаем центр карты на выбранное место
//       const placemark = new ymaps.Placemark(suggestion.coordinates, {
//         balloonContent: suggestion.name,
//       });
//       mapInstance.geoObjects.add(placemark);
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Введите адрес..."
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           borderRadius: "10px",
//           border: "1px solid #ccc",
//         }}
//       />
//       {suggestions.length > 0 && (
//         <ul
//           style={{
//             listStyleType: "none",
//             padding: "0",
//             margin: "0",
//             position: "absolute",
//             backgroundColor: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             width: "calc(100% - 20px)",
//             maxHeight: "150px",
//             overflowY: "auto",
//             zIndex: 1000,
//           }}
//         >
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               style={{
//                 padding: "10px",
//                 cursor: "pointer",
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <strong>{suggestion.name}</strong>
//               <br />
//               <small>{suggestion.description}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div
//         style={{
//           width: "800px",
//           height: "400px",
//           borderRadius: "30px",
//           overflow: "hidden", // Чтобы скругленные углы применялись правильно
//           marginTop: "20px",
//         }}
//       >
//         <div id="map" style={{ width: "800px", height: "100%" }} />
//       </div>
//     </div>
//   );
// };

// export default YandexMap;

// import { FC, useEffect, useState, ChangeEvent } from "react";

// interface Suggestion {
//   name: string;
//   description: string;
//   coordinates: number[];
// }

// const YandexMap: FC = () => {
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [mapInstance, setMapInstance] = useState<any>(null);

//   useEffect(() => {
//     // Создаем новый элемент script для загрузки Яндекс API
//     const script = document.createElement("script");
//     script.src =
//       "https://api-maps.yandex.ru/2.1/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&lang=ru_RU";
//     script.async = true; // Загрузка скрипта будет асинхронной

//     // Обработчик загрузки скрипта
//     script.onload = () => {
//       const ymaps = (window as any).ymaps;
//       if (ymaps) {
//         ymaps.ready(() => {
//           // Создание карты с центром в г. Россошь, Воронежская область
//           const map = new ymaps.Map("map", {
//             center: [50.198224, 39.568724], // Координаты Россошь, Воронежская область
//             zoom: 7, // Уровень зума
//             controls: [], // Отключаем все стандартные контролы
//             type: "yandex#map",
//           });

//           // Добавление маркера на карту
//           const placemark = new ymaps.Placemark([50.198224, 39.568724], {
//             balloonContent: "Россошь, Воронежская область",
//           });
//           map.geoObjects.add(placemark); // Добавляем маркер на карту

//           // Добавляем нужные контролы
//           map.controls.add("zoomControl"); // Контроль зума

//           // Убираем панель инструментов, которая содержит "Создать свою карту"
//           map.controls.remove("typeSelector");

//           // Сохраняем экземпляр карты в состоянии
//           setMapInstance(map);
//         });
//       }
//     };

//     // Добавление скрипта в документ
//     document.body.appendChild(script);

//     // Очистка при размонтировании компонента
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Функция для запроса подсказок из Geocoder API Яндекс
//   const fetchSuggestions = async (query: string) => {
//     // Координаты Россоши, Воронежская область
//     const rossoshCoordinates = "39.568724,50.198224"; // Долгота, широта

//     // Определение bounding box для центральной части России
//     const centralRussiaBBox = "36.4,50.2~40.2,55.8"; // Пример: координаты углов центральной части России

//     const response = await fetch(
//       `https://geocode-maps.yandex.ru/1.x/?apikey=24db9142-1eba-40c7-802b-11bcc7c78dc6&format=json&geocode=${query}&bbox=${centralRussiaBBox}&ll=${rossoshCoordinates}&spn=0.552069,0.400552&rspn=1`
//     );
//     const data = await response.json();
//     const suggestions = data.response.GeoObjectCollection.featureMember.map(
//       (member: any) => {
//         const geoObject = member.GeoObject;
//         return {
//           name: geoObject.name,
//           description: geoObject.description || "",
//           coordinates: geoObject.Point.pos.split(" ").reverse().map(Number),
//         };
//       }
//     );
//     return suggestions.slice(0, 6); // Возвращаем только первые 6 подсказок
//   };

//   // Функция для обработки изменений в поле ввода
//   const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setInputValue(value);

//     if (value.length > 3) {
//       try {
//         const results = await fetchSuggestions(value);
//         setSuggestions(results);
//       } catch (error) {
//         console.error("Ошибка при получении подсказок:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Функция для обработки выбора подсказки
//   const handleSuggestionClick = (suggestion: Suggestion) => {
//     setInputValue(suggestion.name);
//     setSuggestions([]);

//     // Центрируем карту на выбранное место и добавляем маркер
//     const ymaps = (window as any).ymaps;
//     if (ymaps && mapInstance) {
//       mapInstance.setCenter(suggestion.coordinates, 14); // Устанавливаем центр карты на выбранное место
//       const placemark = new ymaps.Placemark(suggestion.coordinates, {
//         balloonContent: suggestion.name,
//       });
//       mapInstance.geoObjects.add(placemark);
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Введите адрес..."
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           borderRadius: "10px",
//           border: "1px solid #ccc",
//         }}
//       />
//       {suggestions.length > 0 && (
//         <ul
//           style={{
//             listStyleType: "none",
//             padding: "0",
//             margin: "0",
//             position: "absolute",
//             backgroundColor: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             width: "calc(100% - 20px)",
//             maxHeight: "150px",
//             overflowY: "auto",
//             zIndex: 1000,
//           }}
//         >
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               style={{
//                 padding: "10px",
//                 cursor: "pointer",
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <strong>{suggestion.name}</strong>
//               <br />
//               <small>{suggestion.description}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div
//         style={{
//           width: "800px",
//           height: "400px",
//           borderRadius: "30px",
//           overflow: "hidden", // Чтобы скругленные углы применялись правильно
//           marginTop: "20px",
//         }}
//       >
//         <div id="map" style={{ width: "800px", height: "100%" }} />
//       </div>
//     </div>
//   );
// };

// export default YandexMap;
