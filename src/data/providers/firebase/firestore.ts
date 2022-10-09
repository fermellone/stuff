import { app } from '$data/providers/firebase/config';

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
	type DocumentData
} from 'firebase/firestore';

export const firestore = getFirestore(app);

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

	async getAll() {
		const querySnapshot = await getDocs(this.collection);
		const docs: DocumentData[] = [];
		querySnapshot.forEach((doc) => {
			docs.push(doc.data());
		});
		return docs;
	}

	async create(data: any) {
		const docRef: DocumentReference = await addDoc(this.collection, data);
		return docRef.id;
	}

	async update(id: string, data: any) {
		const docRef = doc(this.db, this.collectionName, id);
		await updateDoc(docRef, data);
	}

	async delete(id: string) {
		const docRef = doc(this.db, this.collectionName, id);
		await deleteDoc(docRef);
	}
}

export default DB;
