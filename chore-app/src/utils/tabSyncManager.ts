/**
 * Tab Sync Manager
 *
 * Enables real-time synchronization across browser tabs using BroadcastChannel API.
 * Works in conjunction with Zustand's persist middleware to keep all tabs in sync.
 */

const CHANNEL_NAME = 'chore-app-sync';
const STORAGE_KEY = 'chore-app-storage';

let broadcastChannel: BroadcastChannel | null = null;
let storageListener: ((e: StorageEvent) => void) | null = null;

/**
 * Initialize cross-tab synchronization
 * @param onSync - Callback function to execute when sync event is received
 */
export const initTabSync = (onSync: () => void): void => {
  // Check if BroadcastChannel is supported
  if (typeof BroadcastChannel === 'undefined') {
    console.warn('BroadcastChannel API not supported in this browser');
    return;
  }

  // Create broadcast channel for cross-tab communication
  broadcastChannel = new BroadcastChannel(CHANNEL_NAME);

  // Listen for sync messages from other tabs
  broadcastChannel.onmessage = (event) => {
    if (event.data?.type === 'STATE_UPDATED') {
      // Trigger rehydration from localStorage
      onSync();
    }
  };

  // Fallback: Listen for storage events (for older browsers or as backup)
  // Storage events fire when localStorage changes in OTHER tabs (not current tab)
  storageListener = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue !== null) {
      // Trigger rehydration from localStorage
      onSync();
    }
  };
  window.addEventListener('storage', storageListener);
};

/**
 * Broadcast state update to other tabs
 * Call this after making state changes that should sync
 */
export const broadcastStateUpdate = (): void => {
  if (broadcastChannel) {
    broadcastChannel.postMessage({
      type: 'STATE_UPDATED',
      timestamp: Date.now()
    });
  }
};

/**
 * Cleanup: Close broadcast channel and remove listeners
 * Call this when component unmounts
 */
export const cleanupTabSync = (): void => {
  if (broadcastChannel) {
    broadcastChannel.close();
    broadcastChannel = null;
  }

  if (storageListener) {
    window.removeEventListener('storage', storageListener);
    storageListener = null;
  }
};

/**
 * Check if tab sync is currently active
 */
export const isTabSyncActive = (): boolean => {
  return broadcastChannel !== null;
};
