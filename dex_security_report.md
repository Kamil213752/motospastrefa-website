# Raport bezpieczeństwa DEX

## Główne zagrożenia
1. **Front-running**
- Mechanizm: Minerzy mogą przyspieszać swoje transakcje
- Przykład: Sandwich attacks na Uniswap

2. **Nadmierne approve**
- Ryzyko: Kontrakty z dostępem do nieograniczonych środków
- Rozwiązanie: Używanie `increaseAllowance` zamiast `approve`

3. **Fałszywe eventy**
- Metoda: Phishing przez manipulację Transfer/Approval events
- Ochrona: Weryfikacja adresów kontraktów

## Case studies
...
