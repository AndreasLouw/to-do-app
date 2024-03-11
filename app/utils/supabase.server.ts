import { createServerClient } from "@supabase/auth-helpers-remix";

export const createSupabaseServerClient = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) =>
  createServerClient(
    "https://kdorjywivwzfnyaanfbj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb3JqeXdpdnd6Zm55YWFuZmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NDk4MDUsImV4cCI6MjAyNTMyNTgwNX0.J1Qcg_1Q7mMvMutPedY0LRI8RmlWs8Dbp2iljMgcudM",

    { request, response }
  );