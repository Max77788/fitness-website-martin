# Martin Fitness - Coach Fitness en Ligne

Landing page et systeme de reservation pour un coach fitness personnel proposant des seances en direct sur Zoom.

## Fonctionnalites

- **Landing page** moderne avec hero, tarifs, et appel a l'action
- **Paiement Stripe** integre pour la reservation de seances
- **Acces Zoom unique** par client avec code personnel (non partageable)
- **Tableau de bord client** pour consulter les reservations et acceder aux seances
- **Webhook WhatsApp** pour l'automatisation des leads (questions, reponses, redirection vers paiement)
- **Gestion des plans** : seance unique, pack hebdomadaire, abonnement mensuel

## Stack Technique

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** + shadcn/ui
- **Prisma** + PostgreSQL
- **Stripe** (paiements)
- **Zoom API** (creation de reunions et enregistrement des participants)
- **NextAuth** (authentification)

## Configuration

1. Copiez `.env` et remplissez les variables :

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
ZOOM_ACCOUNT_ID="..."
ZOOM_CLIENT_ID="..."
ZOOM_CLIENT_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
APP_URL="http://localhost:3000"
WHATSAPP_WEBHOOK_TOKEN="..."
```

2. Initialisez la base de donnees :

```bash
npx prisma migrate dev --name init
npm run db:seed
```

3. Lancez le serveur de developpement :

```bash
npm run dev
```

## Deploiement Vercel

1. Poussez le code sur GitHub
2. Importez le projet sur Vercel
3. Configurez les variables d'environnement dans l'interface Vercel
4. Pour le webhook Stripe, configurez l'URL `https://votre-site.com/api/webhooks/stripe`
5. Pour le webhook WhatsApp, configurez l'URL `https://votre-site.com/api/webhooks/whatsapp`

## Zoom - Acces Unique

Le systeme utilise l'**API d'enregistrement Zoom** pour generer un lien de participation unique par client :
- Lors du paiement, le client est enregistre comme participant a la reunion Zoom
- Zoom genere un `join_url` unique pour ce participant
- Ce lien ne peut pas etre partage efficacement car il est lie a l'email du client
