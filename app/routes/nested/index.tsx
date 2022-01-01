import { MetaFunction } from "remix"

export let meta: MetaFunction = (rootData): any => {

    /*
    rootData gets passed in from the root metadata function
     */
    return {
        title: 'spencer'
    }

};

const NestedHome = () => {
    return (
        <div>
            Index
        </div>
    )
}
export default NestedHome