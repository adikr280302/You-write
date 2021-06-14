const pageVariants = {
    hidden:{
        opacity:0.5,
        x:'-100vw'
    },
    visible:{
        opacity:1,
        x:0,
        transition:{
            type:'spring',
            when:"beforeChildren",
            staggerChildren:0.4
            
        }
    },
    hidden_exit:{
        x:'100vw',
        opacity:0,
    }
}
export default pageVariants;