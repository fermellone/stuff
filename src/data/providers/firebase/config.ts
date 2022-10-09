import { initializeApp } from 'firebase/app';

import { FIREBASE_CONFIG } from '$lib/config';

export const app = initializeApp(FIREBASE_CONFIG);
