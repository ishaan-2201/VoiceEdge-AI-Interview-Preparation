import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) {
    redirect("/");
  }
  return (
    <>
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4 items-center max-sm: flex-col">
          <div className="flex gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              width={40}
              height={40}
              alt="cover-image"
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {interview.type}
        </p>
      </div>
      <Agent
        userName={user?.name!}
        userId={user?.id!}
        type="interview"
        interviewId={id}
        questions={interview.questions}
      />
    </>
  );
};

export default page;
