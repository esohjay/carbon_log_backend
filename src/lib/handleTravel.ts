import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import generateId from "./generateId";
import { TravelArgs } from "../types/track";

export const handleTravel = async (data: TravelArgs) => {
  const { uid, emission, unit, mode, value } = data;
  const trackRef = db.collection("track").doc(uid);
  const doc = await trackRef.get();
  const id = generateId();
  if (!doc.exists) {
    await trackRef.set({
      travel: [{ value, mode, emission, id, unit }],
    });
  } else {
    await trackRef.update({
      travel: FieldValue.arrayUnion({
        value,
        mode,
        emission,
        id,
        unit,
      }),
    });
  }
  return { ...data, id };
};
