import { ref, set, push, get, onValue } from 'firebase/database';
import { getDb } from './firebase';

// 1. Add Question
export async function addQuestion(questionObject) {
  const db = getDb();
  if (!db) return;
  const questionsRef = ref(db, 'questions');
  const newQuestionRef = push(questionsRef);

  // Unique ID set
  await set(newQuestionRef, {
    ...questionObject,
    id: newQuestionRef.key,
  });
}

// 2. get All Questions
export async function getQuestions() {
  const db = getDb();
  if (!db) return [];
  const snapshot = await get(ref(db, 'questions'));

  if (snapshot.exists()) {
    // Convert object to array
    return Object.values(snapshot.val());
  }
  return [];
}

export async function getQuestionDetailsById(id) {
  const db = getDb();
  if (!db) return null;
  const snapshot = await get(ref(db, `question-details/${id}`));

  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
}

export async function getLeetCodeQuestions() {
  const db = getDb();
  if (!db) return [];
  const snapshot = await get(ref(db, 'leetcode'));

  if (snapshot.exists()) {
    // Convert object to array
    return Object.values(snapshot.val());
  }
  return [];
}

export async function getLeetCodeQuestionDetailsById(id) {
  const db = getDb();
  if (!db) return null;
  const snapshot = await get(ref(db, `leetcode-details/${id}`));

  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
}

export async function getAllBlogPosts() {
  const db = getDb();
  if (!db) return [];
  const snapshot = await get(ref(db, 'blogs'));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  }
  return [];
}

// 3. Realtime Listener
export function listenQuestions(callback) {
  const db = getDb();
  if (!db) return callback([]);
  const questionsRef = ref(db, 'questions');

  onValue(questionsRef, (snapshot) => {
    if (snapshot.exists()) {
      const questionsArray = Object.values(snapshot.val());
      callback(questionsArray);
    } else {
      callback([]);
    }
  });
}
