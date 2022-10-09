import { app } from '$data/providers/firebase/config';
import { ENV } from '$lib/config';

import {
	getFirestore,
	collection,
	getDoc,
	doc,
	getDocs,
	updateDoc,
	addDoc,
	deleteDoc,
	DocumentReference,
	type DocumentData,
	connectFirestoreEmulator
} from 'firebase/firestore';

export const firestore = getFirestore(app);
if (ENV == 'development') {
	connectFirestoreEmulator(firestore, 'localhost', 8080);
}

class DB {
	db;
	collection;
	collectionName;

	constructor(collectionName: string) {
		this.db = firestore;
		this.collectionName = collectionName;
		this.collection = collection(firestore, collectionName);
	}

	async get(id: string) {
		const docRef = doc(this.db, this.collectionName, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			return null;
		}
	}

	async getAll<Type>(): Promise<Type[]> {
		const querySnapshot = await getDocs(this.collection);
		const docs: Type[] = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id } as Type);
		});
		return docs;
	}

	async create<Type>(data: Type): Promise<string> {
		const docRef: DocumentReference = await addDoc(this.collection, data as DocumentData);
		return docRef.id;
	}

	async update<Type>(id: string, data: Type) {
		const docRef = doc(this.db, this.collectionName, id);
		await updateDoc(docRef, data as DocumentData);
	}

	async delete(id: string) {
		const docRef = doc(this.db, this.collectionName, id);
		await deleteDoc(docRef);
	}
}

export default DB;
