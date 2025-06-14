import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsById,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  const [interviews, latestInterviews] = await Promise.all([
    await getInterviewsById(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview"> Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          width={400}
          height={400}
          alt="Robot"
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Past Interviews</h2>
        <div className="interviews-section">
          {interviews?.length! > 0 ? (
            interviews!.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p>You haven't taken ay interviews yet!</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {latestInterviews?.length! > 0 ? (
            latestInterviews!.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p>There are no new interviews available!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
