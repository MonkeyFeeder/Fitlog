import React from 'react';

import './resources-page.styles.scss';

const ResourcesPage = () => {
    return (
        <div className="resources-page">
            <h1>Resources and tips</h1>
            <h2>How to use this website ?</h2>
            <ul>
                <li>Create a workout log</li>
                <li className="special-li">Set the URL as a bookmark !</li>
                <li>Create exercises</li>
                <li>Add a workout, it'll set the date automatically</li>
                <li>Add exercises</li>
                <li>Set the weight and reps ( and n° of set, it lets you input 2 and 2b or any other custom notation for special sets, like if you use supersets of dropsets )</li>
            </ul>
            <h2>Want to check your progress ?</h2>
            <p>There's a charts page, select the exercise you want a chart for and it'll generate a chart for you.</p>
            <h2>I want to start lifting, where do I start ?</h2>
            <p>There are tons of resources online, on YouTube and Reddit for example. Here's a list of YouTube channels or subreddits that can help you :</p>
            <ul>
                <li><a href="https://thefitness.wiki/getting-started-with-fitness/" target="_blank" rel="noopener noreferrer">Reddit's Getting Started page</a></li>
                <li><a href="https://thefitness.wiki/faq/" target="_blank" rel="noopener noreferrer">Reddit's Fitness FAQ</a></li>
                <li><a href="https://thefitness.wiki/routines/" target="_blank" rel="noopener noreferrer">Reddit's Fitness Recommended Routines</a></li>
                <li>FitnessFAQ</li>
                <li>CalisthenicsMovement</li>
                <li>AthleanX</li>
            </ul>
        </div>
    );
};

export default ResourcesPage;