Vue.component('academic-record', {
        props: [],
        data: function () {
            return {
                records : []
            }
        },

        computed: {
        },

        mounted: function () {
            let recordsQuery = "query{ records{ degree{ name } meanGrade }";

            Axios.get('/graphql/', {params: { query: recordsQuery}})
                .then(function(response){
                    this.records = response.data;
                });

        },

        template: `
        
        `,
});