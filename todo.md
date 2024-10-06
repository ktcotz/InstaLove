Do poprawy:

2. AuthContext do poprawy pobierania useUsera.
3. Loading na profile details.

PROCES : BUDOWA MESSAGES

1. Logika aktywności usera, zalogowany i wylogowany. Potrzebne do sprawdzenia aktualnie zalogowanych użytkowników.
2. Pobranie tych użytkowników w messages bar i wyrenderowanie ich (MAX 10 users).

Logika:

1. Jeżeli zaloguje się to zaktualizuj usera w tabeli users, pole logged_in.
2. Jeżeli zamknie stronę to zaktualizuj usera w tabeli users, pole logout_in.

Otestowane komponenty, sprawdzone accesibility i zod z poprawą UI&UX :

- Home i wszystkie podkomponenty.
- Authentication.
- Navigation.
- Notifications.
- Search.
- Explore.
- Reels.
- Create Post.
- Profile, profile details, edit profile, switchers, home profile,proposed profiles, hover profiles.
- Stories.

NA SAMYM KOŃCU PO CAŁYM PROJEKCIE, WIADOMOŚCI.
