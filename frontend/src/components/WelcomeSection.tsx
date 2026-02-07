import React from "react";

export function WelcomeSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mt-2">
            Welcome to the Jain Society of Toronto
          </h2>
          <div className="section-divider w-32 mx-auto mt-4 mb-8 border-b-2 border-gold/50" />
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-justify md:text-center">
            <p>
              The Jain Society of Toronto (JSOT) located in Scarborough, Toronto is a non-profit religious organization to pursue a goal of practicing, promoting and preserving the Jain religion. It is governed by a constitution and managed by Board of Directors and an Executive Committee consisting of President, Vice President, Secretary, Treasurer and 8 Members of Management Committee, who are elected by the members for a term of two years.
            </p>
            <p>
              It provides a place for worship, learning, and community engagement, offering regular religious services, festivals, educational programs, youth activities, and outreach initiatives to the Jain community. During the year dignitaries from India and other parts of the world visit our center and hold lectures and discourses in Jainism.
            </p>
            <p>
              Through volunteerism, compassion, and community service, the Jain Society of Toronto strives to contribute positively not only to its members but also to the broader Canadian society.
            </p>
            <p className="font-serif font-bold text-secondary text-2xl pt-4">
              We look forward to seeing you at the Jain Center!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}