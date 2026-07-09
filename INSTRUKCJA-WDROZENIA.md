# Instrukcja wdrożenia strony MotoSpaStrefa na Cloudflare Pages

## Krok 1: Zakup domeny motospastrefa.com (najtańsza opcja)

**Cloudflare Registrar - NAJTAŃSZY OPCJA**
- Cena: ~$10-15/rok (~40-60 zł) - bez marży, cena hurtowa
- Wejdź na: https://www.cloudflare.com/products/registrar/
- Zaloguj się lub załóż konto Cloudflare (darmowe)
- Wyszukaj domenę: `motospastrefa.com`
- Jeśli domena jest dostępna, dodaj ją do koszyka i opłać
- Po zakupie domena będzie dostępna w Twoim koncie Cloudflare
- **ZALETA:** Automatyczna integracja z Cloudflare Pages - wszystko w jednym miejscu

## Krok 2: Połączenie z GitHub (dla automatycznych deployów)

### 2.1 Utwórz repozytorium na GitHub:
1. Wejdź na: https://github.com/new
2. Nazwa repozytorium: `motospastrefa-website`
3. Ustaw jako publiczne lub prywatne
4. Kliknij "Create repository"

### 2.2 Połącz lokalne repozytorium z GitHub:
```bash
cd /Users/kamilkocon/CascadeProjects
git branch -M main
git remote add origin https://github.com/TWOJ-USERNAME/motospastrefa-website.git
git push -u origin main
```

**Uwaga:** Zastąp `TWOJ-USERNAME` swoim nazwą użytkownika GitHub

## Krok 3: Wdrożenie na Cloudflare Pages z GitHub

1. **Wejdź na:** https://dash.cloudflare.com/
2. **Kliknij:** "Workers & Pages" → "Create application"
3. **Wybierz:** "Pages" → "Connect to Git"
4. **Wybierz:** Twoje repozytorium `motospastrefa-website`
5. **Ustawienia build:**
   - **Build command:** `npm run build`
   - **Build output directory:** `.output/public`
6. **Kliknij:** "Save and Deploy"

## Krok 4: Podłączenie domeny

1. W Cloudflare Pages, wejdź do ustawień swojej strony
2. Kliknij "Custom domains"
3. Kliknij "Set up a custom domain"
4. Wpisz: `motospastrefa.com`
5. Cloudflare automatycznie skonfiguruje DNS
6. Poczekaj na propagację DNS (5-30 minut)

## Jak to będzie działało:

1. **Ja edytuję** stronę lokalnie w `/Users/kamilkocon/CascadeProjects`
2. **Ty pushujesz** zmiany do GitHub: `git push`
3. **Cloudflare automatycznie** buduje i deployuje stronę
4. **Zmiany pojawiają się** na `motospastrefa.com` w 1-2 minuty

## Alternatywa - ręczne wdrożenie:

Jeśli nie chcesz używać GitHub, możesz ręcznie wrzucać folder `.output/public` do Cloudflare Pages, ale to będzie mniej wygodne.

## Uwagi

- Projekt jest już zbudowany w folderze `.output/public`
- Cloudflare Pages oferuje darmowy hosting z SSL
- Automatyczne deployy z GitHub są darmowe
- Domena kosztuje ~$10-15 rocznie

## Pomoc

Jeśli potrzebujesz pomocy z konfiguracją Git lub wrzucaniem na GitHub, daj znać!
