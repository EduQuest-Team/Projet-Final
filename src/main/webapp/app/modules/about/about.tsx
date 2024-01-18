import React from 'react';
// import * as LucideIcon from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// import { Github, Linkedin } from 'lucide-react';
import { supervisor, team } from 'app/modules/about/index';

declare const Github: LucideIcon;
declare const Linkedin: LucideIcon;

const About = () => {
  return (
    <>
      <div className="py-4 w-full bg-slate-600 text-center lg:py-24 lg:px-6">
        <div className="">
          <h2 className="mb-5 text-4xl tracking-tight font-weight-bolder text-info">Our Team</h2>
        </div>
        <div className="flex-box align-items-center justify-between">
          {team.map(person => (
            <div key={person.name} className="text-center mx-4 text-primary">
              <img className="mx-auto mb-4 w-36 h-36 rounded-circle border border-success" src={person.image} alt="img" />
              <h3 className="mb-1 text-2xl font-weight-bold tracking-tight text-card-title">{person.name}</h3>
              <p className="py-2 text-dark">{person.job}</p>
              <div className="flex-box justify-center-l mt-4 space-x-4">
                <a title="github" href={person.github} className="text-black hover:text-white rounded-circle">
                  <Github />
                </a>

                <a title="linkedin" href={person.linkedIn} className="text-[#3e66d3] hover:text-white rounded-circle">
                  <Linkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="w-48 h-1 mt-4 border-0 rounded bg-primary" />
      <div className="px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mb-5 mx-auto max-w-screen-sm ">
          <h2 className="text-4xl tracking-tight font-weight-bolder text-info">Our Supervisor</h2>
        </div>
        <div className="">
          {supervisor.map(person => (
            <div key={person.name} className="text-center font-weight-bold text-md text-primary">
              <img className="mx-auto mb-4 w-36 rounded-circle border border-success" src={person.image} alt="img" />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-card-title">{person.name}</h3>
              <p className="py-2">{person.job}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
