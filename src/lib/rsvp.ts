/**
 * DEMO: Mock RSVP implementation — no Firebase required.
 *
 * Valid demo token: DEMO123
 * The demo shows the full confirmation flow without a real backend.
 */

export interface Guest {
  token: string;
  maxGuests: number;
  status: 'pending' | 'confirmed' | 'declined';
  confirmedGuests: number;
  invitees?: Array<{
    firstName?: string;
    lastName?: string;
    fullName?: string;
  }>;
  name?: string;
}

const DEMO_GUESTS: Record<string, Guest> = {
  DEMO123: {
    token: 'DEMO123',
    name: 'Invitado Demo',
    maxGuests: 2,
    status: 'pending',
    confirmedGuests: 0,
    invitees: [
      { fullName: 'Nombre Apellido' },
      { fullName: 'Otro Apellido' },
    ],
  },
  DEMO456: {
    token: 'DEMO456',
    name: 'Familia Demo',
    maxGuests: 4,
    status: 'pending',
    confirmedGuests: 0,
    invitees: [
      { fullName: 'Nombre Apellido' },
      { fullName: 'Segundo Apellido' },
    ],
  },
};

// Simple runtime store so confirmations persist during the session
const runtimeStore: Record<string, Guest> = structuredClone(DEMO_GUESTS);

/** Simulate a small async delay to replicate real calls */
function delay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validate token and return guest data.
 * Returns null if token is invalid.
 */
export async function validateRSVPToken(token: string): Promise<Guest | null> {
  await delay();
  const key = token.trim().toUpperCase();
  return runtimeStore[key] ?? null;
}

/**
 * Submit RSVP confirmation (mock — no real persistence).
 */
export async function submitRSVP(
  token: string,
  confirmedGuests: number,
  status: 'confirmed' | 'declined',
): Promise<boolean> {
  await delay();
  const key = token.trim().toUpperCase();
  if (!runtimeStore[key]) return false;
  runtimeStore[key] = { ...runtimeStore[key], status, confirmedGuests };
  return true;
}
