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

## Krok 2: Wdrożenie na Cloudflare Pages

### Opcja A: Przez Git (zalecane)

1. **Utwórz repozytorium na GitHub:**
   - Wejdź na https://github.com/new
   - Nazwa repozytorium: `motospastrefa-website`
   - Ustaw jako publiczne lub prywatne
   - Kliknij "Create repository"

2. **Wyślij kod na GitHub:**
   ```bash
   cd /Users/kamilkocon/CascadeProjects
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TWOJ-USERNAME/motospastrefa-website.git
   git push -u origin main
   ```

3. **Połącz z Cloudflare Pages:**
   - Wejdź na https://dash.cloudflare.com/
   - Kliknij "Workers & Pages" → "Create application"
   - Wybierz "Pages" → "Connect to Git"
   - Wybierz swoje repozytorium `motospastrefa-website`
   - Ustawienia build:
     - **Build command:** `npm run build`
     - **Build output directory:** `.output/public`
   - Kliknij "Save and Deploy"

### Opcja B: Direct Upload (bez Gita)

1. Wejdź na https://dash.cloudflare.com/
2. Kliknij "Workers & Pages" → "Create application"
3. Wybierz "Pages" → "Upload assets"
4. Prześlij zawartość folderu: `/Users/kamilkocon/CascadeProjects/.output/public`
5. Kliknij "Deploy site"

## Krok 3: Podłączenie domeny

1. W Cloudflare Pages, wejdź do ustawień swojej strony
2. Kliknij "Custom domains"
3. Kliknij "Set up a custom domain"
4. Wpisz: `motospastrefa.com`
5. Cloudflare automatycznie skonfiguruje DNS
6. Poczekaj na propagację DNS (zazwyczaj 5-30 minut)

## Krok 4: Weryfikacja

1. Po zakończeniu deployu, Cloudflare pokaże Ci URL strony
2. Wejdź na `https://motospastrefa.com`
3. Sprawdź czy strona działa poprawnie

## Uwagi

- Projekt jest już zbudowany w folderze `.output/public`
- Cloudflare Pages oferuje darmowy hosting z SSL
- Automatyczne deployy z GitHub są darmowe
- Domena kosztuje ~$10-15 rocznie

## Pomoc

Jeśli potrzebujesz pomocy z konfiguracją Git lub wrzucaniem na GitHub, daj znać!
