const Showcase = () => {
  const jobList = [
    { title: "person", tags: ["*"] }, // instead of doing a special char we prolly wanna dyanmically add this in
    { title: "bootlicker", tags: ["boots", "licking", "sucking up"] },
    { title: "Asskisser", tags: ["ass", "kissing", "sucking up"] },
  ];

  const bulletPoints = [
    {
      text: "Licked boots at a rate of 57 per minute, the highest of all current employees",
      tags: ["boots", "licking"],
      jobIndex: 1,
    },
    {
      text: "Licked other various objects as needed such as lollipops, street lamps, and more",
      tags: ["licking"],
      jobIndex: 1,
    },
    {
      text: "Begged really, really hard to get the job",
      tags: ["sucking up"],
      jobIndex: 1,
    },
    {
      text: "Begged super, duper hard for a promotion",
      tags: ["sucking up"],
      jobIndex: 2,
    },
    {
      text: "Thoroughly performed ass kissing duties ensuring to kiss both cheeks according to proper protocol",
      tags: ["ass", "kissing"],
      jobIndex: 2,
    },
    {
      text: "Owned and maintained my personal ass for over 26 years",
      tags: "ass",
      jobIndex: 2,
    },
  ];

  const skillList = [{ text: "everything" }, { text: "nothing" }];

  return (
    <div className="flex flex-[2_1_0%] items-center justify-center">
      I am a {"    "}
      <select name="jobs" id="jobs">
        {jobList.map((job, index) => {
          return <option key={index} value={job.title} label={job.title} />;
        })}
      </select>{" "}
      doing{" "}
      <select name="skills" id="skills">
        {skillList.map((skill, index) => {
          return <option key={index} value={skill.text} label={skill.text} />;
        })}
      </select>
    </div>
  );
};

export { Showcase };
