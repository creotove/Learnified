import React from "react";
import SingleBlogPost from "./SingleBlogPost";

const RecentBlogs = () => {
  return (
    <section className="pb-20 bg-white p-5 flex flex-col gap-10">
      <div className="w-full text-center">
        <h3 className="text-5xl font-bold">Recent Blog Posts</h3>
      </div>
      <div className="flex gap-5 flex-wrap items-center justify-center my-auto h-full">
        <SingleBlogPost
          label={"Technology"}
          title={"The Future of AI in Education"}
          author={"John Doe"}
          date={"12th August 2021"}
          image={"https://picsum.photos/200"}
        />
        <SingleBlogPost
          label={"Technology"}
          title={"The Future of AI in Education"}
          author={"John Doe"}
          date={"12th August 2021"}
          image={"https://picsum.photos/200"}
        />
        <SingleBlogPost
          label={"Technology"}
          title={"The Future of AI in Education"}
          author={"John Doe"}
          date={"12th August 2021"}
          image={"https://picsum.photos/200"}
        />
      </div>
    </section>
  );
};

export default RecentBlogs;
