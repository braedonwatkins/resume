import { useEffect, useState } from "react";

const Showcase = () => {
  const bulletPoints = [
    {
      text: "Licked boots at a rate of 57 per minute, the highest of all current employees",
      tags: ["boots", "licking"],
      expIndex: 1,
    },
    {
      text: "Licked other various objects as needed such as lollipops, street lamps, and more",
      tags: ["licking"],
      expIndex: 1,
    },
    {
      text: "Begged really, really hard to get the job",
      tags: ["sucking up"],
      expIndex: 1,
    },
    {
      text: "Begged super, duper hard for a promotion",
      tags: ["sucking up"],
      expIndex: 2,
    },
    {
      text: "Thoroughly performed ass kissing duties ensuring to kiss both cheeks according to proper protocol",
      tags: ["ass", "kissing"],
      expIndex: 2,
    },
    {
      text: "Owned and maintained my personal ass for over 26 years",
      tags: ["ass"],
      expIndex: 2,
    },
  ];

  const tags = [
    ...new Set(bulletPoints.flatMap((bulletPoint) => bulletPoint.tags)),
  ];

  console.log(tags);

  const titleList = [
    { title: "person", tags: ["*"] }, // TODO: instead of doing a special char we prolly wanna dyanmically add this in
    { title: "bootlicker", tags: ["boots", "licking", "sucking up"] },
    { title: "asskisser", tags: ["ass", "kissing", "sucking up"] },
  ];

  const expList = [
    { title: "person", tags: ["*"] }, // TODO: instead of doing a special char we prolly wanna dyanmically add this in
    { title: "bootlicker", tags: ["boots", "licking", "sucking up"] },
    { title: "asskisser", tags: ["ass", "kissing", "sucking up"] },
  ];

  const skillList = [
    {
      text: "everything",
      tags: ["*"], // TODO: instead of all or nothing we prolly wanna dynamically add this in
    },
    { text: "Angular", tags: ["ass"] },
    { text: "Leadership", tags: ["sucking up"] },
    { text: "nothing", tags: [] },
  ];

  const [selectedTitles, setSelectedTitles] = useState(titleList[0]);
  const [selectedSkills, setSelectedSkills] = useState(skillList[0]);
  const [renderProjects, setRenderProjects] = useState(expList);

  useEffect(() => {
    const projRender = expList.some();
    console.log();
  }, [selectedTitles, selectedSkills]);
  return (
    <div className="flex flex-[2_1_0%] items-center justify-center gap-1">
      <div>I am a</div>
      <select
        name="jobs"
        id="jobs"
        onChange={() => setSelectedTitles(selectedTitles)}
      >
        {titleList.map((job, index) => {
          return <option key={index} value={job.title} label={job.title} />;
        })}
      </select>
      doing
      <select
        name="skills"
        id="skills"
        onChange={() => setSelectedSkills(selectedSkills)}
      >
        {skillList.map((skill, index) => {
          return <option key={index} value={skill.text} label={skill.text} />;
        })}
      </select>
      <div></div>
    </div>
  );
};

export { Showcase };
