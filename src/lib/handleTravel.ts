import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import generateId from "./generateId";
import { TravelArgs } from "../types/track";

export const handleTravel = async (data: TravelArgs) => {
  const { id, emission, unit, mode, value } = data;
  const trackRef = db.collection("track").doc(id);
  const doc = await trackRef.get();
  if (!doc.exists) {
    await trackRef.set({
      travel: [{ value, mode, emission, id: generateId(), unit }],
    });
  } else {
    await trackRef.update({
      travel: FieldValue.arrayUnion({
        value,
        mode,
        emission,
        id: generateId(),
        unit,
      }),
    });
  }
  return data;
};
