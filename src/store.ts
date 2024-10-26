import { atom } from "jotai";
import { ProfileProps } from "./types";

export const userAtom = atom<ProfileProps | null>(null);