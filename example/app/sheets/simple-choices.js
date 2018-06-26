import casual from "casual-browserify";

export default () => (
    {
        maxHeightRatio: 0.7,
        title: casual.title,
        message: casual.description,
        choices: casual.array_of_words( casual.integer( 0, 7 ) ).map( choice => ( { label: choice, value: choice } ) )
    }
);
