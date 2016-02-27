import castNested from '../../fields/utils/cast_nested.js';
import triggerBeforeSave from './trigger_before_save.js';
import triggerBeforeUpdate from './trigger_before_update.js';
import triggerAfterSave from './trigger_after_save.js';
import triggerAfterUpdate from './trigger_after_update.js';
import isModified from './is_modified.js';
import getModifier from './get_modifier.js';
import documentValidate from '../../validators/utils/document_validate.js';

function documentUpdate(doc, trusted = false) {
	let Class = doc.constructor;
	let Collection = Class.getCollection();

	// Return if there were no modifications.
	if (!isModified({
			doc
		})) {
		// 0 documents were modified.
		return 0;
	}

	// Trigger before events.
	castNested(doc);
	triggerBeforeSave(doc, trusted);
	triggerBeforeUpdate(doc, trusted);

	// Validate a document.
	documentValidate(doc);

	// Update a document.
	let result = Collection._collection.update({
		_id: doc._id
	}, getModifier({
		doc
	}));

	// Trigger after events.
	triggerAfterUpdate(doc, trusted);
	triggerAfterSave(doc, trusted);

	return result;
};

export default documentUpdate;