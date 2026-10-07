import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export type Wish = {
  id: number;
  name: string;
  note: string;
  created_at: string;
};

export const createWishes = async (
  body: Pick<Wish, "name" | "note" | "created_at">,
) => {
  const { error } = await supabaseClient.from("wishes").insert(body);

  if (error) {
    console.error("Error inserting wish:", error);
    throw error;
  }

  return true; // Trả về thành công
};
