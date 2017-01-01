import Ember from 'ember';
import {storageFor} from "ember-local-storage";

export default Ember.Component.extend({
    tasksStorage: storageFor('Tasks'),
    actions: {
        onListItemChanged() {
            this.get('onListItemChanged')();
        }
    }
});
