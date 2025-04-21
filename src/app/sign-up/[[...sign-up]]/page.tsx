import { SignUp } from "@clerk/nextjs";

export default function signup() {
  return (
    <div className=" min-h-[90vh] p-[10vh] z-[0] flex items-center justify-center">
        <SignUp />
    </div>
  );
}