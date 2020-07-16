var browser

const FILTERS = [
    {
        key: "period",
        label: "Par période"
    },
    {
        key: "composer",
        label: "Par compositeur"
    },
    {
        key: "interpreter",
        label: "Par interprète"
    }
]

/**
 * Instanciate the Vue.js model
 * @param {*} el the DOM element containing the Vue.js template
 * @param {*} clips A list of media clips
 */
function initBrowser(el, clips){
    const data = {
        clips,
        filteredClips: clips,
        ... FILTERS.reduce((acc, f) => {
            acc[f.key] = null
            return acc
        }, {})
    }

    const computed = {
        /** Compute whether a filter is currently active */
        isFiltered: function(){
            return FILTERS.some(f => this[f] !== null)
        },
        /** 
         *  For each filters, create a computed list containing all unique values for such a filter.
         *  For instance, if we have a filter named 'composer', it will create a computed list named 'composers'
         *  containing all unique composers in the list of media. Furthermore, it will associate for each composer
         *  its number of occurence within the filtering context, and whether it's the active filter
         */
        ... FILTERS.reduce((acc, f) => {
            acc[f.key + 's'] = function(){
                return uniqValuesOf(f.key)(this.clips).sort().map(value => {
                    return {
                        name: value,
                        nb: this.filteredClips.reduce((acc, clip) => clip[f.key] == value ? acc + 1 : acc, 0),
                        active: this[f.key] == value
                    }
                })
            }
            return acc
        }, {})
    }

    const methods = {
        applyFilter: function(filter,value){
            this[filter.key] = value
            this.filteredClips = this.clips.filter(clip => FILTERS.every(f => {
                return this[f.key] === null // or the filter is 'off'
                || this[f.key] == clip[f.key] // or both values match
            }))
        },
        reset: function(){
            FILTERS.forEach(filter => this[filter.key] = null)
            this.filteredClips = this.clips
        },
        values: function(filter){
            return this[filter.key + 's']
        }
    }
    browser = new Vue({
        delimiters: ['[[', ']]'], // We have to change default Vue.js delimiters as they conflict wih Django brackets
        el,
        data,
        computed,
        methods })
}

/**
 * Given a field name, and a list of media clips, returns the list of unique values
 * found within that list. 
 */
const uniqValuesOf = field => clips => {
    return (clips || []).reduce((values, current) => {
        const v = current[field]
        if(!values.includes(v))
            values.push(v)
        return values
    }, [])
}