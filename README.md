# Intercity Taxi | Back-End (Nest JS)

Back-End part of web-app for intercity taxi in Rossosh, Russia.

## Бот

- **Ограничение доступа**: Доступ предоставляется только аккаунтам, указанным в коде. Обычные пользователи не имеют доступа.

- **Управление заказами**:

  - **Проверка и удаление устаревших заказов**: Проверяет заказы на срок хранения в 1 месяц и удаляет их. Проверка осуществляется при запуске приложения и далее каждые 12 часов.
  - **Обновление статуса заказов**:
    - Заказы с подтвержденным статусом, находящиеся в базе более 1 часа, изменяют статус на **ЗАВЕРШЕН**.
    - Заказы со статусом ожидания, находящиеся в базе более 1 часа, изменяют статус на **ОТМЕНЁН**.
      Проверка осуществляется при запуске приложения и далее каждые 30 минут.

- **Валидация команд**: Происходит проверка на синтаксис команд.

## Канал

- **Управление заказами**:
  - Каждый новый заказ с сайта отправляется в канал.
  - Возможность подтвердить, отменить или завершить заказ.
  - Возможность обновить заказ для получения актуальной информации.
  - Если при обновлении заказа его статус изменен на завершён, клавиатура пропадает.
  - Если при обновлении заказ отсутствует в базе, он удаляется из чата.

## Личный чат

- **Управление заказами**:
  - Возможность восстановить все заказы в канал, если сообщения пропали. Можно восстановить все заказы или только незавершенные.
  - Возможность обновить информацию о водителе, автомобиле, цене, тарифе.
  - Возможность получить информацию о заказе по ID.
  - Возможность удалить заказ по ID.
  - Возможность очистить базу данных с заказами по паролю.

## Пример использования команд

(Символ `|` означает ИЛИ, выберите что-то одно. Символ `/` указывает на несколько аргументов, разделяемых этим символом.)

- `/parse_orders all | unfinished`
- `/get_order ID заказа`
- `/delete_order ID заказа`
- `/set_driver ID заказа/Имя водителя/Номер водителя`
- `/set_car ID заказа/Цвет автомобиля/Модель автомобиля/Гос.знак`
- `/set_price ID заказа/Цена`
- `/set_tariff ID заказа/Тариф`
- `/drop_orders Пароль`
