import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  where,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { v4 as uuidv4 } from "uuid";
import { createChat } from "completions";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};
const firebaseConfig2 = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY2,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN2,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID2,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET2,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID2,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID2,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID2,
};
export const app2 = initializeApp(firebaseConfig2, "admin");
export const auth2 = getAuth(app2);
export const db2 = getFirestore(app2);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
export async function getUserById(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.log(`User with ID ${userId} does not exist`);
    }
    return userDoc.data();
  } catch (error) {
    return error;
  }
}
export async function addMessageToConversation(
  message,
  authorId,
  participants
) {
  try {
    const sortedParticipantIds = participants?.map((p) => p.uid).sort();
    const conversationId = sortedParticipantIds.join("_");
    const conversationDocRef = doc(db, conversationId, conversationId);
    const conversationDoc = await getDoc(conversationDocRef);
    if (!conversationDoc.exists()) {
      console.log(`Conversation with ID ${conversationId} does not exist`);
    }

    const messages = conversationDoc.data().messages || [];
    messages.push({
      id: uuidv4(),
      content: message,
      sender: authorId,
      timestamp: Date.now(),
    });
    await updateDoc(conversationDocRef, {
      messages: messages,
    });
  } catch (error) {
    return error;
  }
}
export async function createConversation(conversationId, conversationData) {
  try {
    const conversationDocRef = doc(db, conversationId, conversationId);
    await setDoc(conversationDocRef, conversationData);
    return { id: conversationId, ...conversationData };
  } catch (error) {
    return error;
  }
}
export async function addConversation(participants) {
  try {
    // Sort participants by ID to ensure consistency
    const sortedParticipantIds = participants.map((p) => p.uid).sort();
    const conversationId = sortedParticipantIds.join("_");

    // Check if the conversation already exists in the db
    const conversationDocRef = doc(db, conversationId, conversationId);
    const conversationDoc = await getDoc(conversationDocRef);

    if (conversationDoc.exists()) {
      // Conversation already exists, return the existing chat room ID
      return conversationDoc.id;
    } else {
      const newConversationData = {
        participants: participants,
        messages: [],
        createdAt: Date.now(),
        id: conversationId,
      };

      // Ensure no undefined fields are passed
      if (
        Object.values(newConversationData).some((value) => value === undefined)
      ) {
        console.log("Undefined value found in conversation data");
      }

      // Set the document with initial data
      await createConversation(conversationId, newConversationData);

      // Return the ID of the new chat room
      return conversationId;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function addPage(pageData) {
  try {
    const pageRef = doc(db, "pages", pageData.pageId);
    const pageSnap = await getDoc(pageRef);

    if (!pageSnap.exists()) {
      await setDoc(pageRef, {
        ...pageData,
        id: pageData.pageId,
        createdAt: Date.now(),
        page: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(userId, data) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, data);
}

export async function getOpinions() {
  const opinionsRef = collection(db, "opinions");
  const opinionsSnap = await getDocs(opinionsRef);
  const opinions = opinionsSnap.docs.map((doc) => doc.data());
  return opinions;
}
export async function addOpinion(data) {
  const id = uuidv4();
  const opinionRef = doc(db, "opinions", id);
  await setDoc(opinionRef, {
    ...data,
    id,
    createdAt: Date.now(),
  });
  return id;
}
export async function updateUserSubscriptionData(
  userId,
  subscriptionId,
  customerId,
  payment
) {
  const userRef = doc(db, "users", userId);

  try {
    // Check if the user document exists
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Update the subscriptionId and customerId for recurring payments
      // Append the new payment to the existing `payments` array
      await updateDoc(userRef, {
        subscriptionId,
        customerId,
        payments: arrayUnion(payment),
        active: payment.result === "paid" ? true : false,
      });
    } else {
      // Initialize the user data for a new subscription
      await setDoc(userRef, {
        subscriptionId,
        customerId,
        payments: [payment],
        active: payment.result === "paid" ? true : false,
      });
    }
  } catch (error) {
    console.error("Error updating subscription data:", error);
    console.log(error); // Propagate the error for additional handling if needed
  }
}
export async function pushAssistantMessage(data, uid) {
  const userDocRef = doc(collection(db, "users"), uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    await updateDoc(userDocRef, {
      assistantMessages: arrayUnion({
        ...data,
        createdAt: Date.now(),
      }),
    });
    return userDocRef;
  } else {
    await setDoc(userDocRef, {
      assistantMessages: [{ ...data, createdAt: Date.now() }],
    });
    return userDocRef;
  }
}
export async function deleteJobOffer(jobOfferId) {
  const jobOfferRef = doc(db, "job_offers", jobOfferId);
  await deleteDoc(jobOfferRef);
}
export async function deleteService(id) {
  const serviceRef = doc(db, "services", id);
  await deleteDoc(serviceRef);
}
export async function createAIChat(data) {
  const chatId = uuidv4();
  const productDocRef = doc(collection(db, "chats"), chatId);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      data,
    });
    return productDocRef;
  }
}
export async function pushSpecialization(data) {
  const id = uuidv4();
  const productDocRef = doc(collection(db, "specializations"), id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
      id: id,
    });
    return productDocRef;
  }
}
export async function updateSpecialization(id, data) {
  const docRef = doc(collection(db, "specializations"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function createUser(data) {
  const dbUser = await getDocument("users", data.uid);
  if (!dbUser) {
    await setDoc(doc(db, "users", data.uid), data);
    return { exists: false };
  }
  if (dbUser) {
    return { exists: true };
  }
}
export async function pushLead(data) {
  const id = uuidv4();
  const productDocRef = doc(collection(db, "leads"), id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
      id: id,
    });
    return productDocRef;
  }
}
export async function updateContent(id, data) {
  const docRef = doc(collection(db, "content"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function updateLead(id, data) {
  const docRef = doc(collection(db, "leads"), id);
  await updateDoc(docRef, data);
  return docRef;
}
async function addBooking(req, id) {
  await setDoc(doc(db, "bookings", id), req);
}
async function updateBooking(uid, id) {
  const docRef = doc(db, "bookings", id);
  await updateDoc(docRef, {
    uid: uid,
    isReliable: true,
  });
}
async function getBookingById(id) {
  const docRef = doc(db, "bookings", id);
  const docSnapshot = await getDoc(docRef);
  const booking = {
    id: docSnapshot.id,
    ...docSnapshot.data(),
  };
  return booking;
}
async function getBookingsByUserId(uid) {
  const ref = collection(db, "bookings");
  const filter = query(ref, where("uid", "==", uid));
  const response = await getDocs(filter);
  const bookings = response.docs.map((doc) => doc.data());
  return bookings;
}
async function getAllBookings() {
  const ref = collection(db, "bookings");
  const response = await getDocs(ref);
  const bookings = response.docs.map((doc) => doc.data());
  return bookings;
}
async function getBookings(uid) {
  const requestsCollection = collection(db, "bookings");
  const userRequestsQuery = query(requestsCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(userRequestsQuery);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return bookings;
}
async function getUsers() {
  const ref = collection(db, "users");
  const response = await getDocs(ref);
  const users = response.docs.map((doc) => doc.data());
  return users;
}
async function getUser(uid) {
  const ref = collection(db, "users");
  const filter = query(ref, where("uid", "==", uid));
  const response = await getDocs(filter);
  const user = response.docs.length > 0 ? response.docs[0].data() : null;
  return user;
}
async function getDocument(collectionName, key) {
  const docRef = doc(db, collectionName, key);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.data();
}
export async function fetchUsers() {
  const ref = collection(db, "users");
  const response = await getDocs(ref);
  const users = response.docs.map((doc) => doc.data());
  return users;
}
export async function fetchOffers() {
  const ref = collection(db, "offers");
  const response = await getDocs(ref);
  const offers = response.docs.map((doc) => doc.data());
  return offers;
}
async function getDocuments(collectionName) {
  const ref = collection(db, collectionName);
  const response = await getDocs(ref);
  const res = response.docs.map((doc) => doc.data());
  return res;
}
async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}
async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(doc(db, collectionName, uniqueId));
}
async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  const existingData = docSnapshot.data();
  const updatedData = { ...existingData };
  keys.forEach((key, index) => {
    updatedData[key] = values[index];
  });
  await updateDoc(docRef, updatedData);
}
async function updateUserLeads(uid, data) {
  const userRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userRef);
  const userData = userSnapshot.data();
  const leads = userData?.leads || [];
  await updateDoc(userRef, { leads: [...leads, data] });
}
async function getBlogPosts() {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
async function addBlogPost(post) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.data()) {
    await setDoc(doc(db, "blog", "blog"), { posts: [post] });
  } else {
    await updateDoc(doc(db, "blog", "blog"), {
      posts: arrayUnion(post),
    });
  }
}
async function updateBlogPost(postId, updatedPost) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

//auto blogger
//product === generated blog post

export async function createDraft(productConfig, customId) {
  const draftDocRef = doc(collection(db, "drafts"), customId);

  const docSnap = await getDoc(draftDocRef);
  if (docSnap.exists()) {
    // Document with customId already exists, do not create a new one
    return draftDocRef;
  } else {
    await setDoc(draftDocRef, {
      ...productConfig,
      createdAt: Date.now(),
    });
    return draftDocRef;
  }
}
export async function deleteBlogPost(postId) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      await updateDoc(docRef, { posts });
    }
  }
}

export async function getDrafts() {
  const querySnapshot = await getDocs(collection(db, "drafts"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  const draftDoc = await getDoc(draftDocRef);
  return draftDoc.exists() ? { ...draftDoc.data(), id: draftDoc.id } : null;
}

export async function updateDraft(draftId, updates) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await updateDoc(draftDocRef, updates);
}

export async function deleteDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await deleteDoc(draftDocRef);
}

export async function deleteMultipleDrafts(draftIds) {
  const promises = draftIds.map(async (draftId) => {
    const draftDocRef = doc(db, "drafts", draftId);
    await deleteDoc(draftDocRef);
  });
  await Promise.all(promises);
}

export async function deleteMultipleProducts(productIds) {
  const promises = productIds.map(async (productId) => {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
  });
  await Promise.all(promises);
}
export async function createProduct(productConfig) {
  const productDocRef = doc(collection(db, "products"), productConfig.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    // Document with customId already exists, do not create a new one
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...productConfig,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
export async function addJobOffer(jobOffer) {
  const jobOfferDocRef = doc(collection(db, "offers"), jobOffer.id);
  await setDoc(jobOfferDocRef, {
    ...jobOffer,
    creationTime: Date.now(),
  });
  return jobOfferDocRef;
}

export async function updateJobOffer(jobOfferId, jobOffer) {
  const jobOfferDocRef = doc(db, "offers", jobOfferId);
  await updateDoc(jobOfferDocRef, jobOffer);
  return jobOfferDocRef;
}

export async function fetchJobOffer(jobOfferId) {
  const jobOfferDocRef = doc(db, "offers", jobOfferId);
  const jobOfferDoc = await getDoc(jobOfferDocRef);
  return jobOfferDoc.exists()
    ? { ...jobOfferDoc.data(), id: jobOfferDoc.id }
    : null;
}
export async function updateApplication(id, data) {
  const docRef = doc(collection(db, "employees"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function fetchJobOffers() {
  const querySnapshot = await getDocs(collection(db, "offers"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
export async function getProduct(productId) {
  const productDocRef = doc(db, "products", productId);
  const productDoc = await getDoc(productDocRef);
  return productDoc.exists()
    ? { ...productDoc.data(), id: productDoc.id }
    : null;
}
export async function getProductByUrl(url) {
  const products = await getProducts();
  const product = products.find((product) => product.url === url);
  return product;
}

export async function updateProduct(productId, updates) {
  const productDocRef = doc(db, "products", productId);
  return await updateDoc(productDocRef, updates);
}

export async function deleteProduct(productId) {
  const productDocRef = doc(db, "products", productId);
  return await deleteDoc(productDocRef);
}
export async function addOrder(id, data) {
  await setDoc(doc(db, "orders", id), data);

  const docRef = doc(db, "orders", id);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data();
}
export async function updateOrder(keys, values, id) {
  const docRef = doc(db, "orders", id);
  const docSnapshot = await getDoc(docRef);

  let updatedData;

  if (docSnapshot.exists()) {
    const existingData = docSnapshot.data();
    updatedData = { ...existingData };

    keys.forEach((key, index) => {
      updatedData[key] = values[index];
    });

    await updateDoc(docRef, updatedData);
  } else {
    const initialData = {};
    keys.forEach((key, index) => {
      initialData[key] = values[index];
    });

    await setDoc(docRef, initialData);
    updatedData = initialData;
  }

  return updatedData;
}

export async function getIdea(userId, ideaId) {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userIdeas = userDoc.data().ideas;
    const ideaIndex = userIdeas.findIndex((idea) => idea.id === ideaId);
    if (ideaIndex !== -1) {
      return userIdeas[ideaIndex];
    }
  }
}

export {
  addBooking,
  auth,
  addDocument,
  getBookings,
  removeDocument,
  getUsers,
  getUser,
  updateDocument,
  getAllBookings,
  updateBooking,
  getBookingById,
  getBookingsByUserId,
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  getDocument,
  getDocuments,
  db,
  app,
  provider,
  storage,
  updateUserLeads,
};
